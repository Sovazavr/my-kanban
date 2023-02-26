import React from 'react'
import "./Popup.scss"
import { useState } from 'react'

const InfoTask = ({ selectedItem, setSelectedItem, boards, setBoards, setAddElemBool }) => {

    const [newItemName, setNewItemName] = useState(selectedItem.item.title)
    const [newItemInfo, setNewItemInfo] = useState(selectedItem.item.info)
    const [newItemImp, setNewItemImp] = useState(selectedItem.item.importance)

    function chekingNull() {
        if (!newItemName) {
            alert('Название задачи не может быть пустым')
            return false
        }
        return true
    }

    function changeTask() {
        if (chekingNull()) {
            if(newItemImp !== selectedItem.item.importance){
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

        <div id='closing' className='wrapper__popup' onClick={() => chekingChange()}>

            <div className='popup__dash' onClick={e => e.stopPropagation()}>

                <div className='popup__content'>
                    <div className='popup__content__inputs'>

                        <input type='text'
                            className='text-field__input'
                            placeholder='Коротко о задаче'
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />

                        <input type='text' id='importance' list='impList'
                            className='text-field__input'
                            placeholder='Важность'
                            value={newItemImp}
                            onChange={(e) => setNewItemImp(e.target.value)}
                            onClick={()=>setNewItemImp('')}
                        />
                        <datalist id='impList' className='text-field__input__list'>
                            <option value='Основная' />
                            <option value='Важно' />
                            <option value='Не важно' />
                        </datalist>

                    </div>

                    <textarea placeholder='А тут можно не коротко'
                        className='text-field__textarea'
                        value={newItemInfo}
                        onChange={(e) => setNewItemInfo(e.target.value)}
                    />
                    <button type='submit' className='popup__button' onClick={() => changeTask()}>
                        изменить
                    </button>
                </div>
            </div>

        </div>

    )
}

export default InfoTask