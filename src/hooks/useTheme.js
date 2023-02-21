import { useContext } from "react";
import { ThemeContext } from "../ThemeChange/context/ThemeContext";



export const useTheme=()=>useContext(ThemeContext);