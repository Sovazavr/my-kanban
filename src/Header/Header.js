import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'
import { Theme } from '../ThemeChange/context/ThemeContext'
import "./Header.scss"

const Header = () => {

    const theme = useTheme()
    function changeTheme() {
        theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
    }

    return (
        <div className='header'>
            <div className="change__theme" onClick={changeTheme}>
                <GlobalSVGSelector typeStar="change_theme" />
            </div>
        </div>
    )
}

export default Header