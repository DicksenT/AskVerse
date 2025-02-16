'use client'

import { Provider } from "react-redux"
import store from "../../redux/store"
import Header from "./Header"
import Input from "./Input"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react"


export default function ProvidedComponent({children}: {children: React.ReactNode}){
    const [width,setWidth] = useState<number>(window.innerWidth)
    useEffect(() =>{
        const handleResize =()=>{
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return()=>{window.removeEventListener('resize', handleResize)}
    },[])
    useEffect(() =>{
        console.log(width)
    },[width])
    return(
        <Provider store={store}>
            <Header/>
            <main className="h-[calc(100vh-71px)] pt-12 pb-24 px-4 overflow-y-auto">
                {children}
            </main>
            <Input/>
        </Provider>
    )
}