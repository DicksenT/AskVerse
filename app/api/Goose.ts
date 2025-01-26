const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.GOOSE_API,
  basePath: 'https://api.goose.ai/v1',
});

export async function GenerateGoose(prompt: string){


const openai = new OpenAIApi(configuration);

openai.createCompletion("gpt-j-6b", {
  prompt: prompt,
  max_tokens: 25,
}).then(
  completion =>{
    return(completion.data.choices[0].text)
});
}