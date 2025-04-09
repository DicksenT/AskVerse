'use client'
import React, { useEffect, useRef, useState } from "react";
import { responseStructure } from "../interfaces";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AllResponse } from "./AllResponse";
import MarkdownRenderer from "./Markdown";

interface responseProps{
    result: responseStructure
}
export const Response:React.FC<responseProps>= ({result})=>{
    const [model, setModel] = useState('OpenAI')
    const [secondModel, setSecondrModel] = useState<string>('')
    const [isCompare, setIsCompare] = useState<boolean>(false)
    const [secondResponse, setSecondResponse] = useState<boolean>(false)
    const [isCompareAll, setIsCompareAll] = useState<boolean>(false)

    
    const width = useSelector((state: RootState) => state.state.width)
    const modelList = ['OpenAI', 'Gemini', 'Cohere', 'DeepSeek', 'Claude']
    useEffect(() =>{   
        setSecondResponse(false)
        setSecondrModel('')
        if(isCompare){
            setSecondrModel(Object.keys(result).find((res) => res!== model && modelList.includes(res)))
            setTimeout(()=>{
                setSecondResponse(true)
            },500)
        }
    },[isCompare])

    return(
    <>
        <section className="w-full flex relative pb-5 mb-5">
            <ResponseCard 
                model={model} 
                otherModel={secondModel} 
                setModel={setModel} 
                hasCompare={true} 
                result={result} 
                width={width}
                isCompare={isCompare}
                setIsCompare={setIsCompare}/>

                {secondResponse &&
                <ResponseCard
                model={secondModel}
                otherModel={model}
                setModel={setSecondrModel}
                hasCompare={false}
                width={width}
                result={result}
                />}
                {width >= 1024 && <button className="absolute bottom-0 right-0" onClick={() => setIsCompareAll(true)}>Compare All</button>}
        </section>
        {isCompareAll && <AllResponse result={result} setIsCompareAll={setIsCompareAll}/>}
        </>
    )
}

interface cardProps{
    model: string,
    otherModel:string
    setModel: React.Dispatch<React.SetStateAction<string>>
    hasCompare:boolean
    result: responseStructure
    width: number
    isCompare?:boolean
    setIsCompare?:React.Dispatch<React.SetStateAction<boolean>>
}

const ResponseCard:React.FC<cardProps> =({model, otherModel, setModel,hasCompare,result,isCompare=true, setIsCompare, width}) =>{
    const [copied, setCopied] = useState<boolean>(false)
    const modelList = ['OpenAI', 'Gemini', 'Cohere', 'DeepSeek', 'Claude']
    const handleCopy = (text:string) =>{
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() =>{
            setCopied(false)
        },1000)
    }
    return(
        <div className={`${isCompare ? 'w-[48%]' : 'w-full'} ${!hasCompare && 'ml-[4%]'} transition-all duration-500 font-light`}>
                <div className="flex items-center gap-4 border-b pb-4 justify-between">
                    <div className="relative group">
                        <button className="border py-1 px-3 w-24 text-sm flex items-center" >
                            {model}
                            <Image src={'/arrow-down-line.svg'} alt="arrow" height={20} width={20}/>
                        </button>
                        <ul className="absolute flex flex-col gap-2 bg-chatBackground p-3 rounded-lg transition-all duration-100 ease-in-out 
                        opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                            {Object.keys(result).map((mod, i) => modelList.includes(mod)&&
                            <li key={i} onClick={() => mod !== otherModel &&  setModel(mod)} 
                            className={` transition-all text-sm duration-500 ease-in-out relative font-bold border-indigo-700 
                            ${model === mod && 'text-primary'}
                            ${otherModel === mod ? 'text-blur cursor-default' : 'hover-underline cursor-pointer'}`}>{mod}</li>)}    
                        </ul>
                    </div>
                    <p className="text-primary font-bold text-sm">{result.personality}</p>
                    <div className="flex gap-2">
                        <button className="flex items-center" onClick={() => handleCopy(result[model])}>
                            <Image src={'/copy.svg'} alt="copy" height={14} width={14}/>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        {hasCompare && width >= 768 &&
                        <button 
                            className={`border py-1 px-2 transition-all duration-300 hover:text-primary ${isCompare && 'border-primary'}`}
                            onClick={() => setIsCompare(prevState => !prevState)}>Compare</button>}
                    </div>
                </div>
                <div className="markdown-preview">
                    <MarkdownRenderer content={result[model]}/>
                </div>
            </div>
    )
}