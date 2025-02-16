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
            {width <= 768 &&  <Header/> }
            <div className="flex h-screen">
            <Sidebar width={width}/>
                <main className={`${width <= 768 ?'h-[calc(100vh-71px)] ' : "h-screen"} flex-1 items-center px-4 overflow-y-auto pt-12 pb-24 `}>
                    {children}
                    <Input/>
                </main>
            </div>
     
            
        </Provider>
    )
}