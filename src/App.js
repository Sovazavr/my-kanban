
import { useState } from 'react';
import './App.scss';
import { ImportanceStars } from './Importance/ImportanceStars';
import { GlobalSVGSelector } from './svgSelector/GlobalSVGSelector';
import Popup from './PopupAddTask/Popup';
import Header from './Header/Header';



function App() {

  const [boards, setBoards] = useState([
    { id: 1, title: "Задачи", items: [{ id: 1, title: "Посрать", importance: '' }, { id: 2, title: "Поспать", importance: 'Не важно' }] },
    { id: 2, title: "В процессе", items: [] },
    { id: 3, title: "На проверке", items: [] },
    { id: 4, title: "Выполнено", items: [] },
  ])
  
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [valueInput, setValueInput] = useState('')
 
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

  function deleteElement(board, item) {


    const currentIndex = board.items.indexOf(item)
    board.items.splice(currentIndex, 1)

    setBoards(boards.map(b => {

      if (b.id === board.id) {
        return board
      }
      return b
    }))
  }
 

  function handleInput(e) {
    setValueInput(e.target.value)
  }

  function enterKeyDown(e, board) {
    if (e.keyCode === 13) {
      const addElem = { id: +(new Date()).getTime(), title: valueInput }
      board.items.splice(board.items.length, 0, addElem)


      setValueInput('')
      setBoards(boards.map(b => {
        if (b.id === board.id) {
          return board
        }

        return b
      }))
    }
  }

  

  return (
    <div className="app">

      {popupActive
        ? <Popup setPopupActive={setPopupActive} boards={boards} setBoards={setBoards}/>
        : <></>
      }
      <Header />
      <div className='board__wrapper'>
        {boards.map(board =>
          <div className='board'
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
          >

            <div className='board__title'>
              {board.id === 1
                ?
                <div>
                  {board.title}
                  <button id='add__task' className={popupActive ? 'add__task__click' : 'add__task'} onClick={() => setPopupActive(true)}>+</button>
                </div>
                : <div>{board.title}</div>
              }
            </div>


            {board.items.map(item =>
              <div className='item'
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}
              >
                <div className='item__text'>
                  <p title={item.title}>{item.title}</p>
                  <p>Важность: {item.importance}</p>

                </div>
                <label onClick={() => deleteElement(board, item)}>X</label>
              </div>)}
          </div>)}
      </div>
    </div>
  );
}

export default App;
