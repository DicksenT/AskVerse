const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GenerateGemini(prompt: string){
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return (result.response.text());
}