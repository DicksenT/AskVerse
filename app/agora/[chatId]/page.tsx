'use client'
import { useParams, usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { AppDispatch, RootState } from "../../../redux/store"
import { setActiveChat } from "../../../redux/chatSlice"
import { Loading } from "../../components/Loading"
import { Response } from "../../components/Response"
import { LostPage } from "../../components/404"
import { useDispatch, useSelector } from "react-redux"
import { fetchMessages } from "../../../redux/messageSlice"
import Image from "next/image"

const ChatPage = () =>{
    const pathname = usePathname()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() =>{
        dispatch(setActiveChat(pathname.slice(7,)))
        return () =>{dispatch(setActiveChat(''))}
    },[pathname])

    const width = useSelector((state: RootState) => state.state.width)

    const chat = useSelector((state: RootState) => state.chats.chats[pathname.slice(7,)])
    const messages = useSelector((state:RootState) => chat ? chat.messages.map((id) => state.messages.messages[id]) :null)
    useEffect(() =>{
        dispatch(fetchMessages())
    },[])

   
    return(
        <ul className={`w-full flex flex-col gap-4 hide ${width < 768 ? 'py-4':'p-4'} scroll-smooth`}>
           {messages ? 
           messages.filter(Boolean).map((msg,i)=>(
            <li key={i} className="flex flex-col w-full items-end gap-4">
                <p className="bg-chatBackground border-text  p-2 w-1/2 rounded-md">{msg.question}</p>
                <div className="w-full py-3">
                    {msg.response[msg.response.length - 1] &&  !msg.response[msg.response.length - 1]?.isLoading ? 
                     <Response result={msg.response[msg.response.length - 1]}/> 
                    :
                   <Loading/>
               
                }</div>
            </li>)) 
            :
            <LostPage/>}
            
        </ul>
    )
}
export default ChatPage