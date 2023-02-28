import React from 'react'
import InfoTask from './InfoTask'
import { useState } from 'react'
import { InfoTaskMobile } from './InfoTaskMobile'

export const InfoWrapper = ({ selectedItem, setSelectedItem, boards, setBoards, setAddElemBool, mobileDevice }) => {

    const [newItemName, setNewItemName] = useState(selectedItem.item.title)
    const [newItemInfo, setNewItemInfo] = useState(selectedItem.item.info)
    const [newItemImp, setNewItemImp] = useState(selectedItem.item.importance)


    function leftArrowClick() {
        if (selectedItem.board.id !== 1) {
            const currentIndex = selectedItem.board.items.indexOf(selectedItem.item)
            selectedItem.board.items.splice(currentIndex, 1)

            setBoards(boards.map(b => {
                if (b.id === selectedItem.board.id) {

                    return selectedItem.board
                } else if (b.id === selectedItem.board.id - 1) {
                    b.items.push(selectedItem.item)
                    return b
                }
                return b
            }))
            setSelectedItem({})
        }
    }
    function rightArrowClick() {
        if (selectedItem.board.id !== 4) {

            const currentIndex = selectedItem.board.items.indexOf(selectedItem.item)
            selectedItem.board.items.splice(currentIndex, 1)

            setBoards(boards.map(b => {
                if (b.id === selectedItem.board.id) {

                    return selectedItem.board
                } else if (b.id === selectedItem.board.id + 1) {
                    b.items.push(selectedItem.item)
                    return b
                }
                return b
            }))
            setSelectedItem({})
        }
    }


    function chekingNull() {
        if (!newItemName) {
            alert('Название задачи не может быть пустым')
            return false
        }
        return true
    }



    function changeTask() {
        if (chekingNull()) {
            if (newItemImp !== selectedItem.item.importance) {
                setAddElemBool(true)
            }
            const currentIndex = selectedItem.board.items.indexOf(selectedItem.item)
            selectedItem.board.items.splice(currentIndex, 1)
            selectedItem.board.items.splice(currentIndex, 0, {
                id: selectedItem.item.id,
                title: newItemName,
                info: newItemInfo,
                importance: newItemImp,
            })

            setBoards(boards.map(b => {

                if (b.id === selectedItem.board.id) {
                    return selectedItem.board
                }
                return b
            }))

            setBoards(boards)
            setSelectedItem({})
        }
    }

    function chekingChange() {
        if (chekingNull()) {
            if (newItemImp !== selectedItem.item.importance || newItemInfo !== selectedItem.item.info || newItemName !== selectedItem.item.title) {
                const yesOrNot = window.confirm('Сохранить изменения?')
                if (yesOrNot) {

                    changeTask()
                } else {
                    setSelectedItem({})
                }
            }
            setSelectedItem({})
        }
    }
    return (
        <>
            {mobileDevice
                ? <InfoTaskMobile
                selectedItem={selectedItem}
                    rightArrowClick={rightArrowClick}
                    leftArrowClick={leftArrowClick}
                    changeTask={changeTask}
                    setNewItemImp={setNewItemImp}
                    setNewItemInfo={setNewItemInfo}
                    setNewItemName={setNewItemName}
                    chekingChange={chekingChange}
                    newItemImp={newItemImp}
                    newItemInfo={newItemInfo}
                    newItemName={newItemName}
                />
                : <InfoTask
                    changeTask={changeTask}
                    setNewItemImp={setNewItemImp}
                    setNewItemInfo={setNewItemInfo}
                    setNewItemName={setNewItemName}
                    chekingChange={chekingChange}
                    newItemImp={newItemImp}
                    newItemInfo={newItemInfo}
                    newItemName={newItemName}
                />
            }
        </>
    )
}
