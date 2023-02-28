import React from 'react'
import "./Popup.scss"
import { useState } from 'react'

const InfoTask = ({ chekingChange, changeTask, setNewItemImp, setNewItemInfo, setNewItemName,  newItemName, newItemInfo, newItemImp}) => {



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