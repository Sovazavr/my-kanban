import React, { useState, Suspense, useRef, useLayoutEffect, useCallback } from 'react'
import Popup from '../Components/PopupAddTask/Popup'
import { InfoWrapper } from '../Components/PopupAddTask/InfoWrapper'

import { BoardsComponent } from '../Components/Boards/BoardsComponent'
import Loading from '../Components/Loader/Loading'
import { Navigate } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"
import { useDispatch } from 'react-redux'
import { storage } from '../Storage/storage'
const BoardsComponentMobile = React.lazy(() => import('../Components/Boards/BoardsComponentMobile'));

const CanbanPage = ({
    boards, setBoards, setAddElemBool, styledImportance
}) => {

    const [mobileDevice, setMobileDevice] = useState(false)
    const [popupActive, setPopupActive] = useState(false)
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [selectedItem, setSelectedItem] = useState({})
    const { isAuth, email } = useAuth()
    const dispatch = useDispatch()

   

    const sizeWindow = useCallback(
        () => {
            const windowInnerWidth = window.innerWidth
            const windowInnerHeight = window.innerHeight

            if (windowInnerWidth >= 320 && windowInnerWidth <= 1025) {
                setMobileDevice(true)
            } else {
                setMobileDevice(false)
            }
            styledImportance()
        },
        [],
    )





    let firstRender = useRef(true)
    useLayoutEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            sizeWindow()
            window.addEventListener("resize", sizeWindow)
        } else {
            storage.setItem('boards', boards);
            styledImportance()
        }
    }, [boards])

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === "item") {
            e.target.style.boxShadow = "0 4px 3px gray"
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = "none"
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = "none"
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        e.stopPropagation()
        e.target.style.boxShadow = "none"
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }


    function dropCardHandler(e, board) {
        board.items.push(currentItem)

        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    function deleteElement(e, board, item) {
        e.stopPropagation()

        const currentIndex = board.items.indexOf(item)
        board.items.splice(currentIndex, 1)

        setBoards(boards.map(b => {

            if (b.id === board.id) {
                return board
            }
            return b
        }))
    }


    return isAuth ? (
        <>

            {popupActive
                ? <Popup
                    setPopupActive={setPopupActive}
                    boards={boards}
                    setBoards={setBoards}
                    setAddElemBool={setAddElemBool}
                />
                : <></>
            }
            {Object.keys(selectedItem).length === 0
                ? <></>
                : <InfoWrapper

                    mobileDevice={mobileDevice}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    boards={boards}
                    setBoards={setBoards}
                    setAddElemBool={setAddElemBool}
                />
            }

            {mobileDevice
                ? <Suspense fallback={<div className='loader__wrapper'><Loading /></div>}>
                    <BoardsComponentMobile
                        boards={boards}
                        setSelectedItem={setSelectedItem}
                        deleteElement={deleteElement}
                        popupActive={popupActive}
                        setPopupActive={setPopupActive}
                        setBoards={setBoards}
                    />
                </Suspense>
                : <BoardsComponent
                    boards={boards}
                    dragOverHandler={dragOverHandler}
                    dropCardHandler={dropCardHandler}
                    dropHandler={dropHandler}
                    dragEndHandler={dragEndHandler}
                    dragStartHandler={dragStartHandler}
                    dragLeaveHandler={dragLeaveHandler}
                    setSelectedItem={setSelectedItem}
                    deleteElement={deleteElement}
                    popupActive={popupActive}
                    setPopupActive={setPopupActive}
                />
            }
        </>
    ) : (
        <Navigate to="/login" />
    )
}
export default CanbanPage