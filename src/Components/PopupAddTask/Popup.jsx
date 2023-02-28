import React, { useState } from 'react'
import "./Popup.scss"
import { storage } from '../../Storage/storage'


const Popup = ({ setPopupActive, boards, setBoards, setAddElemBool }) => {

    const [name, setName] = useState("")
    const [info, setInfo] = useState("")
    const [importance, setImportance] = useState("")


    function addItems() {
        const addElem = { id: +(new Date()).getTime(), title: name, importance: importance, info: info }

        boards.map(b => {
            if (b.id === 1) {
                return b.items.push(addElem)
            }
            return b
        })
        setBoards(boards)
        storage.setItem('boards', boards)
        setAddElemBool(true)
        setPopupActive(false)
    }



    return (
        <div id='closing' className='wrapper__popup' onClick={() => setPopupActive(false)}>
            <div className='popup__dash' onClick={e => e.stopPropagation()}>

                <div className='popup__title'>Новая задача</div>


                <div className='popup__content'>
                    <div className='popup__content__inputs'>

                        <input type='text'
                            className='text-field__input'
                            placeholder='Коротко о задаче'
                            value={name} onChange={(e) => setName(e.target.value)}
                        />

                        <input type='text' id='importance' list='impList'
                            className='text-field__input'
                            placeholder='Важность'
                            onChange={(e) => setImportance(e.target.value)} />

                        <datalist id='impList' className='text-field__input__list'>
                            <option value='Основная' />
                            <option value='Важно' />
                            <option value='Не важно' />
                        </datalist>
                    </div>

                    <textarea placeholder='А тут можно не коротко'
                        className='text-field__textarea'
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <button className='popup__button' onClick={addItems}>
                        добавить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Popup