const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GenerateGemini(prompt: string){
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const markdownPrompt = `Please answer the following question using rich Markdown formatting—including headings, lists, code blocks, tables, and other relevant elements—optimized for rendering with the "react-markdown" library, along with "remark-gfm" and "rehype" plugins. Ensure the formatting includes appropriate spacing and line breaks to enhance readability and prevent content from appearing cluttered. Here is the question: ${prompt}`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(markdownPrompt);
    return (result.response.text());
}