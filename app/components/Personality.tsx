import React, { useState } from "react"

interface personalityProps{
    setPersonality: React.Dispatch<React.SetStateAction<string>>
    setTemperature: React.Dispatch<React.SetStateAction<number>>
    setIsChoosing: React.Dispatch<React.SetStateAction<boolean>>
    personality: string
}
export const Personality:React.FC<personalityProps> =({setIsChoosing, setTemperature, personality, setPersonality}) =>{
    const [personalityDescription, setPersonalityDescription] = useState<string>('')
    const handleClick = (temp, personality) =>{
        setTemperature(temp)
        setPersonality(personality)
        setIsChoosing(false)
    }
    const options = [
        {
            name: 'Normal', 
            temp: 0.5,
            description: "Balanced, practical, good for Q&A and support."},
        {
            name: 'Technical', 
            temp: 0.2,
            description:"Precise, factual, ideal for coding and legal texts."},
        {
            name: 'Creative', 
            temp: 0.8,
            description: "Unique, varied, great for writing and marketing."},
        {
            name: 'Imaginative', 
            temp: 0.9,
            description: "Unpredictable, idea-rich, perfect for innovation." }
    ]
    return(
        <div className="absolute -top-20  border border-text rounded-lg bg-chat max-w-96 min-w-80 w-full flex text-xs">
            <ul className="w-1/2 bg-chatBackground px-2 py-2 rounded-l-lg flex flex-col gap-1 font-bold">
                {options.map((opt) =>(
                    <li key={opt.temp} 
                    className={`pl-5 rounded-md  py-1 transition-all duration-500 cursor-pointer 
                        ${opt.name === personality ? 'bg-primary cursor-default' : 'hover:bg-chat'}`} 
                        onMouseEnter={() => setPersonalityDescription(opt.description)} 
                        onMouseLeave={() => setPersonalityDescription('')}
                        onClick={() => handleClick(opt.temp, opt.name)}
                        >{opt.name}</li>
                ))}
            </ul>
            <p className="w-1/2 font-bold text-sm p-2">{ personalityDescription || options.find((opt) => opt.name === personality).description}</p>
        </div>
    )
}