const { CohereClientV2 } = require('cohere-ai');



export async function GenerateCohere(prompt: string){

  const cohere = new CohereClientV2({
    token: process.env.COHERE_API,
  });
  const markdownPrompt = `Please answer the following question using rich Markdown formatting—including headings, lists, code blocks, tables, and other relevant elements—optimized for rendering with the "react-markdown" library, along with "remark-gfm" and "rehype" plugins. Ensure the formatting includes appropriate spacing and line breaks to enhance readability and prevent content from appearing cluttered. Here is the question: ${prompt}`;
  const response = await cohere.chat({
        model: 'command-r-08-2024',
        messages: [
          {
            role: 'user',
            content: markdownPrompt,
          },
        ],
        
      });
    return response.message.content[0].text
    
}

