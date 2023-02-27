
import { useLayoutEffect, useRef, useState } from 'react';
import './App.scss';

import Popup from './Components/PopupAddTask/Popup';
import Header from './Components/Header/Header';
import { storage } from './Storage/storage';
import InfoTask from './Components/PopupAddTask/InfoTask';
import { useEffect } from 'react';
import { GlobalSVGSelector } from './Components/svgSelector/GlobalSVGSelector';
import { BoardsComponent } from './Components/Boards/BoardsComponent';
import { BoardsComponentMobile } from './Components/Boards/BoardsComponentMobile';
import { useCallback } from 'react';



function App() {

  const [firstBoards, setFirstBoards] = useState([
    { id: 1, title: "Задачи", items: [] },
    { id: 2, title: "В процессе", items: [] },
    { id: 3, title: "На проверке", items: [] },
    { id: 4, title: "Выполнено", items: [] },
  ])

  const [boards, setBoards] = useState(storage.getItem('boards') || firstBoards)
  const [addElemBool, setAddElemBool] = useState(false)
  const [mobileDevice, setMobileDevice] = useState(false)



  function styledImportance() {
    const impElement = document.getElementsByClassName('item__importance')
    for (let i = 0; i < impElement.length; i++) {
      if (impElement[i].innerHTML === 'Основная') {
        impElement[i].style.color = "red";
      } else if (impElement[i].innerHTML === 'Важно') {
        impElement[i].style.color = "orange";
      } else if (impElement[i].innerHTML === 'Не важно') {
        impElement[i].style.color = "green";
      }
    }

  }

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

  useEffect(() => {
    if (addElemBool) {
      styledImportance()
    }
    return setAddElemBool(false)

  }, [addElemBool]);
 

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState({})

  const [popupActive, setPopupActive] = useState(false)

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






  return (
    <div className="app">

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
        : <InfoTask
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          boards={boards}
          setBoards={setBoards}
          setAddElemBool={setAddElemBool}
        />
      }
      <Header />
      {mobileDevice
        ? <BoardsComponentMobile
          boards={boards}
          setSelectedItem={setSelectedItem}
          deleteElement={deleteElement}
          popupActive={popupActive}
          setPopupActive={setPopupActive}
        />
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

    </div>
  );
}

export default App;
