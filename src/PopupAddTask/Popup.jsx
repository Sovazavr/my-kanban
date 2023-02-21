import React from 'react'
import "./Popup.scss"

const Popup = ({ setPopupActive }) => {

   
    

    return (
        <div id='closing' className='wrapper__popup' onClick={()=>setPopupActive(false)}>
            <div className='popup__dash' onClick={e => e.stopPropagation()}>
                <div className='popup__title'>Новая задача</div>
                <div className='popup__content'>
                    <div className='3sd'>
                        <input type='text' placeholder='Коротко о задаче' />
                        <input type='text' id='importance' list='impList' placeholder='Важность' />
                        <datalist id='impList'>
                            <option value='Основная' />
                            <option value='Важно' />
                            <option value='Не важно' />
                        </datalist>
                    </div>

                    <textarea placeholder='А тут можно не коротко' />
                </div>
            </div>
        </div>
    )
}

export default Popup