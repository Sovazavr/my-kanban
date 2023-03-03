
import { useLayoutEffect, useRef, useState } from 'react';
import './App.scss';
import React from 'react';
import Header from './Components/Header/Header';
import { storage } from './Storage/storage';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Suspense } from 'react';
import Loading from './Components/Loader/Loading';
import CanbanPage from './pages/CanbanPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';




function App() {

  const [firstBoards, setFirstBoards] = useState([
    { id: 1, title: "Задачи", items: [] },
    { id: 2, title: "В процессе", items: [] },
    { id: 3, title: "На проверке", items: [] },
    { id: 4, title: "Выполнено", items: [] },
  ])

  const [boards, setBoards] = useState(storage.getItem('boards') || firstBoards)

  const [addElemBool, setAddElemBool] = useState(false)


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

 

  useEffect(() => {
    if (addElemBool) {
      styledImportance()
    }
    return setAddElemBool(false)

  }, [addElemBool]);












  return (

    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<CanbanPage
          styledImportance={styledImportance}
          boards={boards}
          setBoards={setBoards}
          setAddElemBool={setAddElemBool}
        />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/register' element={< RegisterPage />} />
      </Routes>

    </div>

  );
}

export default App;
