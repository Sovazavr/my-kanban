import React, { useCallback, useEffect, useState } from 'react'
import { BoardMobile } from './BoardMobile/BoardMobile'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'


export const BoardsComponentMobile = ({ boards, setSelectedItem, deleteElement, popupActive, setPopupActive }) => {
    const [selectedBoardIndex, setSelectedBoardIndex] = useState(0)

    const startSlide=useCallback((e)=>{
        e.preveventDefault()
    }, [])



    useEffect(() => {
        let event = null;
        const el = document.getElementById('slider')
        el.addEventListener('touchstart', (e) => {
            event=e
        });
        el.addEventListener('touchmove', (e) => {
            console.log("Move alfa: " + (e.touches[0].pageX - event.touches[0].pageX))
        });
        el.addEventListener("touched", function (e) {
            event = null;
        });
    }, []);





    return (
        <div id='slider' className='boards__wrapper'>
            <BoardMobile
                board={boards[selectedBoardIndex]}
                setSelectedItem={setSelectedItem}
                deleteElement={deleteElement}
                popupActive={popupActive}
                setPopupActive={setPopupActive}
            />
        </div>


    )
}
