
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

  const [mobileDevice, setMobileDevice] = useState(false)
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












  return (
    
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={
          <CanbanPage mobileDevice={mobileDevice} boards={boards} setBoards={setBoards} setAddElemBool={setAddElemBool} />
        } />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />

      </Routes>
    </div>
    
  );
}

export default App;
