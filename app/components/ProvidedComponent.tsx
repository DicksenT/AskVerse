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

    return(
        <Provider store={store}>
            {width <= 768 &&  <Header/> }
            <div className={`flex ${width <= 768 ?'h-[calc(100vh-71px)] ' : "h-screen"}`}>
            <Sidebar width={width}/>
                <main className={`h-full flex-1 flex flex-col items-center px-4 overflow-y-auto`}>
                    <section className="flex-1 overflow-y-auto max-h-screen pt-10 w-full max-w-2xl">{children}</section>
                    <Input/>
                </main>
            </div>           
        </Provider>
    ) 
}