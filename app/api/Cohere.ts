const { CohereClientV2 } = require('cohere-ai');



export async function GenerateCohere(prompt: string){

  const cohere = new CohereClientV2({
    token: process.env.COHERE_API,
  });
    const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
  
    return response.message.content[0].text
}

