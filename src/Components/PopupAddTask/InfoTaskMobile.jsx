import React from 'react'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'
import "./PopupMobile.scss"

export const InfoTaskMobile = ({ selectedItem, leftArrowClick, rightArrowClick, chekingChange, changeTask, setNewItemImp, setNewItemInfo, setNewItemName, newItemName, newItemInfo, newItemImp }) => {




    return (
        <div id='closing' className='wrapper__popup__mobile' onClick={() => chekingChange()}>

            <div className='popup__dash__mobile' onClick={e => e.stopPropagation()}>

                <div className='popup__content__mobile'>
                    <div className='popup__content__inputs__mobile'>

                        <input type='text'
                            className='text-field__input__mobile'
                            placeholder='Коротко о задаче'
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />

                        <input type='text' id='importance' list='impList'
                            className='text-field__input__mobile'
                            placeholder='Важность'
                            value={newItemImp}
                            onChange={(e) => setNewItemImp(e.target.value)}
                            onClick={() => setNewItemImp('')}
                        />
                        <datalist id='impList' className='text-field__input__list__mobile'>
                            <option value='Основная' />
                            <option value='Важно' />
                            <option value='Не важно' />
                        </datalist>

                    </div>

                    <textarea placeholder='А тут можно не коротко'
                        className='text-field__textarea__mobile'
                        value={newItemInfo}
                        onChange={(e) => setNewItemInfo(e.target.value)}
                    />

                    <div className='arrowWrapper'>
                        <div className='leftArrow' onClick={() => leftArrowClick()}>
                            {selectedItem.board.id === 1
                                ? <GlobalSVGSelector typeSvg="arrowLeftNoActive" />
                                : <GlobalSVGSelector typeSvg="arrowLeft" />
                            }
                        </div>
                        <button type='submit' className='popup__button__mobile' onClick={() => changeTask()}>
                            изменить
                        </button>
                        <div className='rightArrow' onClick={() => rightArrowClick()}>
                            {selectedItem.board.id === 4
                                ? <GlobalSVGSelector typeSvg="arrowRightNoActive" />
                                : <GlobalSVGSelector typeSvg="arrowRight" />
                            }

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}
