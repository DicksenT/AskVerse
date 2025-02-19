import OpenAI from "openai";
export async function GenerateOpenAI(prompt: string){
    const openai = new OpenAI({apiKey: process.env.OPENAI_API, dangerouslyAllowBrowser:true});
    const markdownPrompt = `Please answer the following question using rich Markdown formatting—including headings, lists, code blocks, tables, and other relevant elements—optimized for rendering with the "react-markdown" library, along with "remark-gfm" and "rehype" plugins. Ensure the formatting includes appropriate spacing and line breaks to enhance readability and prevent content from appearing cluttered. Here is the question: ${prompt}`;
    const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user",   content: markdownPrompt,},
    ],
    store: false,
    temperature: 0.7
});
return (completion.choices[0].message.content);
}