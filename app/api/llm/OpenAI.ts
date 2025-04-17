import OpenAI from "openai";
import { handlePrompt } from "../../utils/markdownPrompt";
export async function GenerateOpenAI(prompt: string, temperature: number){
    try{
        const openai = new OpenAI({apiKey: process.env.OPENAI_API, dangerouslyAllowBrowser:true});
        const markdownPrompt = handlePrompt(temperature, prompt)
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user",   content: markdownPrompt,},
        ],
        store: false,
        temperature: temperature
    });
    return (completion.choices[0].message.content);
    }catch(error){
        console.error('OpenAI API Error', error.message || error)
        return 'Sorry, This model currently unavailable'
    }
}