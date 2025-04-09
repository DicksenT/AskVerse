import React from "react";

export const ModelList = ()=>{
    const models = ['OpenAI', 'Gemini', 'Claude', 'Cohere','DeepSeek']
    return(
        <div className="inline-block relative">
            <button className="peer border rounded-lg w-[72px]">
                Models
            </button>
            <ul className="absolute flex flex-col text-xs gap-1 w-[80px] bg-chatBackground p-3 rounded-lg transition-all duration-100 ease-in-out 
                opacity-0 -translate-y-2 peer-hover:opacity-100 peer-hover:translate-y-0">
                {models.map((model) =>(
                    <li key={model} className="cursor-pointer transition-all duration-500 ease-in-out text-text relative font-bold">{model}</li>
                ))}
            </ul>
        </div>
    )
}