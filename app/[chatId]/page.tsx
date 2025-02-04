'use client'
import { useParams, usePathname } from "next/navigation"
import React from "react"

const ChatPage = () =>{
    const {chatId} = useParams()
    const pathname = usePathname()
    console.log(pathname === '/' + chatId)
    return(
        <>**HELLO**</>
    )
}
export default ChatPage