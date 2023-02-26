import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'
import { Theme } from '../../ThemeChange/context/ThemeContext'
import "./Header.scss"

const Header = () => {

    const theme = useTheme()
    function changeTheme() {
        theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
    }

    return (
        <div className='header__wrapper'>
            <div className='header'>
                <div className="change__theme" onClick={changeTheme}>

                    <div className='change__theme__back'>
                        <GlobalSVGSelector typeSvg={theme.theme === Theme.LIGHT ? "background_switch_light" : 'background_switch_dark'} />
                        <div className={theme.theme === Theme.LIGHT ? 'change__theme__ball__left' : 'change__theme__ball__right'}>
                            <GlobalSVGSelector typeSvg="ball" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header