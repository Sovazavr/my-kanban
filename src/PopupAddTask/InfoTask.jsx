import React from 'react'
import "./Popup.scss"

const InfoTask = ({ selectedItem, setSelectedItem }) => {
    return (
        <div id='closing' className='wrapper__popup' onClick={() => setSelectedItem({})}>
            <div className='popup__dash' onClick={e => e.stopPropagation()}>

                <div className='popup__content'>
                    <div className='popup__content__inputs'>

                        <input type='text'
                            className='text-field__input'
                            placeholder='Коротко о задаче'
                            value={selectedItem.title}
                        />

                        <input type='text' id='importance'
                            className='text-field__input'
                            placeholder='Важность'
                            value={selectedItem.importance}
                        />


                    </div>

                    <textarea placeholder='А тут можно не коротко'
                        className='text-field__textarea'
                        value={selectedItem.info}
                    />

                </div>
            </div>
        </div>
    )
}

export default InfoTask