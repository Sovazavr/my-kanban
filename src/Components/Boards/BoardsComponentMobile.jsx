import React, { useCallback, useEffect, useState } from 'react'
import { BoardMobile } from './BoardMobile/BoardMobile'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'


export const BoardsComponentMobile = ({ boards, setSelectedItem, deleteElement, popupActive, setPopupActive }) => {
    const [selectedBoardIndex, setSelectedBoardIndex] = useState(0)




    useEffect(() => {
    }, []);





    return (
        <div className='boards__wrapper'>
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
