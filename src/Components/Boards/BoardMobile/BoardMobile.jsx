import React from 'react'
import { GlobalSVGSelector } from '../../svgSelector/GlobalSVGSelector'

export const BoardMobile = ({board, setSelectedItem, deleteElement, popupActive, setPopupActive}) => {
    
    return (
        
        <div className='board' key={board.id}>
            <div className='board__title'>
                {board.id === 1
                    ?
                    <div>
                        {board.title}
                        <button id='add__task' className={popupActive ? 'add__task__click' : 'add__task'}
                            onClick={() => setPopupActive(true)}>
                            +
                        </button>
                    </div>
                    : <div>{board.title}</div>
                }
            </div>
            {board.items.map(item =>
                    <div className='item'
                        key={item.id}

                        onClick={() => setSelectedItem({ item: item, board: board })}
                    >
                        <div className='item__text'>
                            <p title={item.title}>{item.title}</p>

                            <p id='importance' className='item__importance'>{item.importance}</p>

                        </div>
                        <label onClick={(e) => deleteElement(e, board, item)}>
                            <GlobalSVGSelector typeSvg='close' />
                        </label>
                    </div>)
            }
        </div>
    )

}
