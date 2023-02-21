import { useState } from "react"
import { storage } from "../../Storage/storage"
import { changeCssRootVariables } from "./ChangeCssRootVariables"
import { ThemeContext } from "../context/ThemeContext"



export const ThemeProvider=({children, ...props})=>{
    const [theme, setTheme]= useState(storage.getItem('theme'))

    changeCssRootVariables(theme)

    function changeTheme(theme) {
        storage.setItem('theme', theme)
        setTheme(theme)
        changeCssRootVariables(theme)
    }

    return <ThemeContext.Provider value={{
        theme,
        changeTheme,
    }} {...props}>{children}</ThemeContext.Provider>

}