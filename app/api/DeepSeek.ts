// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";



export async function GenerateDeepSeek(prompt:string) {
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API,
    dangerouslyAllowBrowser: true
});
const markdownPrompt = `Please answer the following question using rich Markdown formatting—including headings, lists, code blocks, tables, and other relevant elements—optimized for rendering with the "react-markdown" library, along with "remark-gfm" and "rehype" plugins. Ensure the formatting includes appropriate spacing and line breaks to enhance readability and prevent content from appearing cluttered. Here is the question: ${prompt}`;
const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." },
            {role: "user", content: markdownPrompt}
    ],
    model: "deepseek-chat",
    temperature: 0.7
  });
  return(completion.choices[0].message.content);
}

