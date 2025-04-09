// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";
import { handlePrompt } from "../../utils/markdownPrompt";



export async function GenerateDeepSeek(prompt:string, temperature: number) {
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API,
    dangerouslyAllowBrowser: true
});
const markdownPrompt = handlePrompt(temperature, prompt)
const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." },
            {role: "user", content: markdownPrompt}
    ],
    model: "deepseek-chat",
    temperature: temperature
  });
  return(completion.choices[0].message.content);
}

