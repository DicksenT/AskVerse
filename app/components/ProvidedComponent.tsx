'use client'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Header from "./Header"
import Input from "./Input"
import Sidebar from "./Sidebar"
import { useEffect, useRef, useState } from "react"
import { SessionProvider } from "next-auth/react"
import { setWidth } from "../../redux/stateSlice"
import { getChat } from "../../redux/chatSlice"
import Image from "next/image"


export default function ProvidedComponent({children}: {children: React.ReactNode}){
    const dispatch = useDispatch<AppDispatch>()
    const width = useSelector((state : RootState) => state.state.width)
    const scrollRef = useRef(null)

    useEffect(() =>{
        dispatch(getChat())
    },[])
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
    const [scrollBottom, setScrollBottom] = useState<boolean>(false)
    useEffect(() =>{
        const handleScroll = () =>{
            const el = scrollRef.current
            if(!el) return
            const isBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1
            setScrollBottom(isBottom)
        }
        const el = scrollRef.current
        if(!el) return
        el.addEventListener('scroll', handleScroll)
        return()=>{el.removeEventListener('scroll', handleScroll)}
    },[])

    return(
            <SessionProvider>
            {width <= 768 &&  <Header/> }
            <div className={`flex ${width <= 768 ?'h-[calc(100vh-71px)] ' : "h-screen"}`}>
            <Sidebar width={width}/>
            <main className={`h-full flex-1 flex flex-col items-center overflow-y-auto`}>
                <section ref={scrollRef} className={`flex-1 overflow-y-auto max-h-screen ${width < 768 ? 'px-[5%]' : 'px-[10%]'} w-full`}>{children}</section>
                {!scrollBottom && <button className="h-10 absolute w-10 rounded-full bg-background flex items-center justify-center bottom-32" onClick={scrollToBottom}><Image src={'/arrow-down-line.svg'} height={32} width={32} alt="scroll button"/></button>}
                <Input scrollToBottom={scrollToBottom}/>
            </main>
            </div>           
            </SessionProvider>
    ) 
}