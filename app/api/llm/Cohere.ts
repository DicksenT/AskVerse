import { handlePrompt } from "../../utils/markdownPrompt";

import {CohereClientV2} from 'cohere-ai'

export async function GenerateCohere(prompt: string, temperature: number){
  try{
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
  }catch(error){
    console.error('Cohere API Error', error.message || error)
    return 'Sorry this model currently unavailable'
  }

}

