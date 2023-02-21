import React from 'react'
import "./Popup.scss"

const Popup = ({ setPopupActive }) => {




    return (
        <div id='closing' className='wrapper__popup' onClick={() => setPopupActive(false)}>
            <div className='popup__dash' onClick={e => e.stopPropagation()}>
                <div className='popup__title'>Новая задача</div>
                <div className='popup__content'>
                    <div className='popup__content__inputs'>

                        <input type='text' className='text-field__input' placeholder='Коротко о задаче' />

                        <input type='text' id='importance' list='impList' className='text-field__input' placeholder='Важность' />

                        <datalist id='impList'>
                            <option value='Основная' />
                            <option value='Важно' />
                            <option value='Не важно' />
                        </datalist>
                    </div>

                    <textarea placeholder='А тут можно не коротко' className='text-field__textarea'/>
                </div>
            </div>
        </div>
    )
}

export default Popup