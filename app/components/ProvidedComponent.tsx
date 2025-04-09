'use client'

import { Provider, useDispatch, useSelector } from "react-redux"
import store, { AppDispatch, RootState } from "../../redux/store"
import Header from "./Header"
import Input from "./Input"
import Sidebar from "./Sidebar"
import { useEffect, useRef, useState } from "react"
import { SessionProvider } from "next-auth/react"
import { setWidth } from "../../redux/stateSlice"
import { getChat } from "../../redux/chatSlice"


export default function ProvidedComponent({children}: {children: React.ReactNode}){
    const dispatch = useDispatch<AppDispatch>()
    const width = useSelector((state : RootState) => state.state.width)
    const scrollRef = useRef(null)
    const chats = useSelector((state: RootState) => state.chats.chats)

    useEffect(() =>{
        if(Object.entries(chats).length < 1){
            dispatch(getChat())
        }
    },[chats])
    useEffect(() =>{
        const handleResize =()=>{
            dispatch(setWidth(window.innerWidth))
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return()=>{window.removeEventListener('resize', handleResize)}
    },[])

    const scrollToBottom = () =>{
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

    return(
            <SessionProvider>
            {width <= 768 &&  <Header/> }
            <div className={`flex ${width <= 768 ?'h-[calc(100vh-71px)] ' : "h-screen"}`}>
            <Sidebar width={width}/>
            <main className={`h-full flex-1 flex flex-col items-center overflow-y-auto`}>
                <section ref={scrollRef} className={`flex-1 overflow-y-auto max-h-screen ${width < 768 ? 'px-[5%]' : 'px-[10%]'} w-full`}>{children}</section>
                <Input scrollToBottom={scrollToBottom}/>
            </main>
            </div>           
            </SessionProvider>
    ) 
}