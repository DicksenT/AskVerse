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
import { chatStructure, messageStructure, responseStructure } from "../interfaces"
import { usePathname, useRouter } from "next/navigation"
const Input = () =>{
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const activeChat = useSelector((state: RootState) => state.chats.activeChat)
    const [messageId, setMessageId] = useState<string>()
    const messageLoading = useSelector((state: RootState) => messageId ? state.chats.messages[messageId].response.isLoading : false)
    const [text, setText] = useState<string>('')
    const textRef = useRef(null)
    //dynamically adjust text area height
   
    const handleInput = (e) =>{
        setText(e.currentTarget.value)
        textRef.current.style.height = '40px'
        textRef.current.style.height = `${textRef.current.scrollHeight}px`
    }
    const addMessageFn = async(question: string, chatId : string) =>{
       
        const newMessage: messageStructure = {
            id: crypto.randomUUID(),
            chatId: chatId,
            question: question,
            response: {
                OpenAI: null,
                Gemini: null,
                Cohere: null,
                DeepSeek: null,
                Claude: null,
                isLoading: true
            }    
        }
        dispatch(addMessages(newMessage))
        setMessageId(newMessage.id)
        
        const apiResponses = await Promise.all([
            GenerateClaude(question),
            GenerateCohere(question),
            GenerateDeepSeek(question),
            GenerateGemini(question),
            GenerateOpenAI(question)
        ])
        const responseKeys = ['Claude', 'Cohere', 'DeepSeek', 'Gemini', 'OpenAI']
        const response = apiResponses.reduce((acc, value, index)=>{
            if(value) acc[responseKeys[index]] = value
            return acc
        }, {} as Partial<responseStructure>)

        const finalResponse: responseStructure ={
            ...response,
            isLoading: false
        }
        dispatch(addMessagesResponse({msgId: newMessage.id, response: finalResponse}))     
    }
    const handleSubmit = async(e) =>{
       e.preventDefault()
       if(messageLoading) return
       const question = text
       setText('')
       textRef.current.style.height = '40px'
       if(pathname === '/'){
            const newChat: chatStructure = {
                name:'New chat',
                id: crypto.randomUUID(),
                chatListsId: []
            }
            dispatch(addNewChat(newChat))
            dispatch(setActiveChat(newChat.id))
            setTimeout(() =>{
                router.push(newChat.id)
                addMessageFn(question, newChat.id)
            },500)
        }
        else{
            addMessageFn(question, activeChat)
        }

        
    }
    return(
        <div className="flex flex-col justify-center max-w-xl w-full items-center">
        <form className=" min-h-16 max-w-xl pb-4 bg-white flex items-end w-full gap-2 px-4" onSubmit={ (e)=>  handleSubmit(e)}>
            <textarea 
            className="resize-none border rounded-lg bg-indigo-100 outline-none px-4 
            text-xs md:text-sm md:py-2 lg:text-base lg:py-1 w-[calc(100%-40px-8px)] h-10 py-3" name="" id=""
            placeholder="Ask me anything..."
            onInput={handleInput} 
            value={text}
            ref={textRef}
            onKeyDown={(e) =>{
                if(e.key === 'Enter' && !e.shiftKey){
                    handleSubmit(e)
                }
            }}></textarea>
            <button className={`w-10 h-10 bg-indigo-700 p-2.5 rounded-md ${messageLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <Image alt="send image" src='/send-active.svg' width={20} height={20}/>
            </button>
        </form>
        <p className="text-xs font-bold">Response may take a while, please buckle up</p>
        </div>
    )
}
export default Input