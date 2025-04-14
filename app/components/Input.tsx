'use client'
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { GenerateCohere } from "../api/llm/Cohere"
import { GenerateDeepSeek } from "../api/llm/DeepSeek"
import { GenerateGemini } from "../api/llm/Gemini"
import { GenerateOpenAI } from "../api/llm/OpenAI"
import { GenerateClaude } from "../api/llm/Claude"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { addChat, setActiveChat } from "../../redux/chatSlice"
import { chatStructure, responseStructure } from "../interfaces"
import { usePathname, useRouter } from "next/navigation"
import { addResponse, postMessages } from '../../redux/messageSlice'
import { Personality } from "./Personality"


interface inputProps{
    scrollToBottom: () => void
}

const Input:React.FC<inputProps> = ({scrollToBottom}) =>{
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const activeChat = useSelector((state: RootState) => state.chats.activeChat)
    const [messageId, setMessageId] = useState<string>('')
    const isLoading = useSelector((state: RootState) => state.messages.messages[messageId]?.response[0]?.isLoading)
    const [text, setText] = useState<string>('')
    const textRef = useRef(null)

    const [personality, setPersonality] = useState<string>('Normal')
    const [temperature, setTemperature] = useState<number>(0.5)
    const [isChoosing, setIsChoosing] = useState<boolean>(false)


    //dynamically adjust text area height
    const handleInput = (e) =>{
        setText(e.currentTarget.value)
        textRef.current.style.height = '40px'
        if(textRef.current.scrollHeight > 128){
            textRef.current.style.height = '128px'
            textRef.current.style.overflowY ='scroll'
        }else{
            textRef.current.style.height = `${textRef.current.scrollHeight}px`
            textRef.current.style.overflowY ='hidden'
        }
    }

    const generateResponse = async(question: string, msgId: string)=>{

        const apiResponses = await Promise.all([
            GenerateClaude(question, temperature),
            GenerateCohere(question, temperature),
            GenerateDeepSeek(question, temperature),
            GenerateGemini(question, temperature),
            GenerateOpenAI(question, temperature)
        ])
        const responseKeys = ['Claude', 'Cohere', 'DeepSeek', 'Gemini', 'OpenAI']
        const response = apiResponses.reduce((acc, value, index)=>{
            if(value) acc[responseKeys[index]] = value
            return acc
        }, {} as Partial<responseStructure>)

        const finalResponse: Partial<responseStructure> ={
            ...response,
            msgId,
            personality: personality
        }
        dispatch(addResponse(finalResponse))
          
    }

    const addMessageFn = async(question: string, chatId : string) =>{
        const newMessage = await dispatch(postMessages({question, chatId})).unwrap()
        setMessageId(newMessage._id)
        scrollToBottom()
        generateResponse(question, newMessage._id)
    }
    const handleSubmit = async(e) =>{
       e.preventDefault()
       if(isLoading) return
       const question = text
       setText('')
       textRef.current.style.height = '40px'
       if(pathname === '/agora'){
            const newChat = await dispatch(addChat('New Chat')).unwrap()
            await addMessageFn(question, newChat._id)
            setTimeout(() =>{
                router.push(`/agora/${newChat._id}`)
            },500)
        }
        else{
            addMessageFn(question, activeChat)
        }
         
    }
    return(
        <div className="flex py-2 flex-col justify-center max-w-xl w-full items-center relative bg-chatBackground rounded-t-3xl">
            <form className=" min-h-16 max-w-xl pb-4 flex items-end w-full gap-2 px-4" onSubmit={ (e)=>  handleSubmit(e)}>
                <textarea 
                className="resize-none bg-chatBackground outline-none px-4 
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
                <button onClick={(e) => handleSubmit(e)} className={`w-10 h-10 bg-primary p-2.5 rounded-md ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <Image alt="send image" src='/send-active.svg' width={20} height={20}/>
                </button>
            </form>
            <button onClick={() => setIsChoosing((prevState) => !prevState)}
            className={`text-blur flex text-xs hover:bg-chat items-center transition-all duration-500 px-2 rounded-lg ${personality !== 'Normal' && 'text-primary'}`}>{personality !== 'Normal' ? personality : 'Choose Personality'}<Image src={'/arrow-down-line.svg'} alt="arrow" height={20} width={20}/></button>
                {isChoosing && <Personality setIsChoosing={setIsChoosing} setPersonality={setPersonality} personality={personality}
                setTemperature={setTemperature}/>}
        </div>
    )
}
export default Input