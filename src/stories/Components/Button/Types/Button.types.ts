import { ReactNode } from "react"

export type General = {
    text: string
    icon?: string[] | string | ReactNode
    onClick?: () => void
}