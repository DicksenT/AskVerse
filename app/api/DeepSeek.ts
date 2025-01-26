// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API
});

export async function GenerateDeepSeek(prompt:string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." },
            {role: "user", content: prompt}
    ],
    model: "deepseek-chat",
    temperature: 0.7
  });

  return(completion.choices[0].message.content);
}

