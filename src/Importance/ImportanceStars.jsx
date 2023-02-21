import React, { useState } from 'react'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'

export const ImportanceStars = ({ importance }) => {
    const [count, setCount]=useState(0)
    if (importance === 0) {
        return (
            <div>
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
            </div>
        )
    } else if(importance === 1) {
        return (
            <div>
                <GlobalSVGSelector typeStar={'one_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
                <GlobalSVGSelector typeStar={'default_star'} />
            </div>
        )
    }


}
