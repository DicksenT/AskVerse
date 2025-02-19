'use client'
import React, { useEffect, useRef, useState } from "react";
import { responseStructure } from "../interface";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface responseProps{
    result: responseStructure
}
export const Response:React.FC<responseProps>= ({result})=>{
    const [model, setModel] = useState('select')
    return(
        <div className="w-full">
            <div className="flex items-center gap-4 border-b pb-3 justify-center">
                <div className="relative group">
                <button className="border py-1 px-3 w-24" >
                    {model}
                </button>
                <ul className="absolute flex flex-col gap-2 bg-indigo-50 p-3 rounded-lg transition-all duration-100 ease-in-out 
                opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    {Object.keys(result).map((mod, i) => mod !== 'isLoading' && 
                    <li key={i} onClick={() =>setModel(mod)} 
                    className={`cursor-pointer transition-all duration-500 ease-in-out  hover-underline relative font-bold border-indigo-700 ${model === mod && 'text-indigo-700'}`}>{mod}</li>)}    
                </ul>
                </div>
                Response
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} 
            className="prose max-w-full overflow-x-auto text-gray-800 text-clip">
                {result[model]}
            </ReactMarkdown>
        </div>
    )
}