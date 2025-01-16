import React from "react"
import { General } from "./Types/Button.types"

export const Button: React.FC<General> = React.memo(({text,icon,onClick}) => {
    return <>
        <button>{text}</button>
    </>
})

