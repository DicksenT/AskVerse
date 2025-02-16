'use client'
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { GenerateCohere } from "../api/Cohere"
import { GenerateDeepSeek } from "../api/DeepSeek"
import { GenerateGemini } from "../api/Gemini"
import { GenerateOpenAI } from "../api/OpenAI"
import { GenerateClaude } from "../api/Claude"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { addMessages, addMessagesResponse, addNewChat, setActiveChat } from "../../redux/chatSlice"
import { chatStructure, messageStructure, responseStructure } from "../interface"
import { usePathname, useRouter } from "next/navigation"
const Input = () =>{
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const activeChat = useSelector((state: RootState) => state.chats.activeChat)
    const stateChat = useSelector((state: RootState) => state.chats)
    const [text, setText] = useState<string>('')
    const textRef = useRef(null)
    //dynamically adjust text area height
   
    const handleInput = (e) =>{
        setText(e.currentTarget.value)
        textRef.current.style.height = '40px'
        textRef.current.style.height = `${textRef.current.scrollHeight}px`
    }
    const handleSubmit = async(e) =>{
       e.preventDefault()
       await Promise.all([
        GenerateClaude(text),
        GenerateCohere(text),
        GenerateDeepSeek(text),
        GenerateGemini(text),
        GenerateOpenAI(text)
       ])
    }
    return(
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