'use client'
import Image from "next/image"
import React from "react"
const Input = () =>{
    return(
        <form className="fixed bottom-6 flex items-end gap-2">
            <textarea className="resize-none border min-h-10 w-full rounded-lg outline-none p-4" name="" id="" placeholder="Ask Me Anything..."></textarea>
            <button className="w-10 h-10 bg-indigo-700 p-2.5 rounded-md">
                <Image alt="send image" src='/send-active.svg' width={20} height={20}/>
            </button>
        </form>
    )
}
export default Input