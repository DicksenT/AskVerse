const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: process.env.COHERE_API,
});

export async function GenerateCohere(prompt: string){
    const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
    
    return response.messages.content[0].text
}

