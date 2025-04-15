'use client'
import React, { useState } from "react"
import { responseStructure } from "../interfaces"
import Image from "next/image"
import MarkdownRenderer from "./Markdown"


interface allResponseProps{
    result: responseStructure
    setIsCompareAll: React.Dispatch<React.SetStateAction<boolean>>
}

export const AllResponse: React.FC<allResponseProps> = ({result, setIsCompareAll}) =>{
    const modelList = ['OpenAI', 'Gemini', 'Cohere', 'DeepSeek', 'Claude']
    return(
        <section className="bg-background bg-opacity-90 z-50 top-0 w-screen h-screen absolute left-0 scrollbar pt-0">
            <button className="w-full px-5 py-4"
            onClick={() => setIsCompareAll(false)}>
                <Image src={'/close.svg'} alt="close button" height={40} width={40} className="ml-auto"/>
            </button>
            <ul className="flex gap-20 all-response px-10" id="all-response">
                {Object.entries(result).map(([name, value]) => modelList.includes(name) && 
                <li key={name} className="min-w-96">
                    <ResponseCard value={value} name={name}/>
                </li>)}
            </ul>
        </section>
    )
}

interface cardProps{
    value: string
    name:string
}

const ResponseCard:React.FC<cardProps> = ({value, name}) =>{
    const [copied, setCopied] = useState<boolean>(false)

    const handleCopy = (text: string)=>{
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }
    return(
        <div className="flex flex-col  h-[calc(100vh-90px)]">
            <div className="flex items-center gap-4 border-b pb-4 justify-between">
                {name}              
                <button className="flex items-center" onClick={() => handleCopy(value)}>
                    <Image src={'/copy.svg'} alt="copy" height={14} width={14}/>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>   
            <div className="markdown-preview flex-1 overflow-y-scroll bg-chatBackground">
                <MarkdownRenderer content={value}/>
            </div>
        </div>
    )
}