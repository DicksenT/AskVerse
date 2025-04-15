import { handlePrompt } from "../../utils/markdownPrompt";

import {GoogleGenerativeAI} from '@google/generative-ai'

export async function GenerateGemini(prompt: string, temperature: number){
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const markdownPrompt = handlePrompt(temperature, prompt)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig:{
            temperature: temperature
        },
    });
    const result = await model.generateContent(markdownPrompt);
    return (result.response.text());
}