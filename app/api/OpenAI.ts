import OpenAI from "openai";
export async function GenerateOpenAI(prompt: string){
    const openai = new OpenAI({apiKey: process.env.OPENAI_API});
    const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user",   content: prompt,},
    ],
    store: false,
    temperature: 0.7
});

return (completion.choices[0].message);
}