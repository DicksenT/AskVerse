import { handlePrompt } from "../../utils/markdownPrompt";

const { CohereClientV2 } = require('cohere-ai');

export async function GenerateCohere(prompt: string, temperature: number){

  const cohere = new CohereClientV2({
    token: process.env.COHERE_API,
  });
  const markdownPrompt = handlePrompt(temperature, prompt)
  const response = await cohere.chat({
        model: 'command-r-08-2024',
        temperature: temperature,
        messages: [
          {
            role: 'user',
            content: markdownPrompt,
          },
        ],  
      });
    return response.message.content[0].text
    
}

