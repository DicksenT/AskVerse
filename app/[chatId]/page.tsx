'use client'
import { useParams, usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { setActiveChat } from "../../redux/chatSlice"
import { Loading } from "../components/Loading"
import { Response } from "../components/Response"

const ChatPage = () =>{
    const {chatId} = useParams()
    const pathname = usePathname()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() =>{
        dispatch(setActiveChat(pathname.slice(1,)))
        return () =>{dispatch(setActiveChat(''))}
    },[pathname])
    const chat = useSelector((state: RootState) => state.chats.chats[pathname.slice(1,)])
    
    const messages = useSelector((state: RootState) => chat ?  chat.chatListsId.map(id => state.chats.messages[id]) : []) 
    return(
        <>**HELLO**</>
    )
}
export default ChatPage