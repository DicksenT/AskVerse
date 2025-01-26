'use client'
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
const Input = () =>{
    const [text, setText] = useState<string>('')
    const textRef = useRef(null)
    const handleInput = (e) =>{
        setText(e.currentTarget.value)
        textRef.current.style.height = '40px'
        textRef.current.style.height = `${textRef.current.scrollHeight}px`
    }
    const handleSubmit = async(e) =>{
       e.preventDefault()
    }
    return(
        <form className="fixed bottom-6 flex items-end gap-2">
            <textarea className="resize-none border min-h-10 w-full rounded-lg outline-none p-4" name="" id="" placeholder="Ask Me Anything..."></textarea>
        <form className="fixed bottom-6 flex items-end w-full gap-2 px-4 left-0" onSubmit={(e)=> handleSubmit(e)}>
            <textarea 
            className="resize-none border rounded-lg outline-none px-4 text-xs w-[calc(100%-40px-8px)] h-10 py-3" name="" id=""
            placeholder="Ask me anything..."
            onInput={handleInput}
            ref={textRef}></textarea>
            <button className="w-10 h-10 bg-indigo-700 p-2.5 rounded-md">
                <Image alt="send image" src='/send-active.svg' width={20} height={20}/>
            </button>
        </form>
    )
}
export default Input