import Anthropic from '@anthropic-ai/sdk';
import { handlePrompt } from '../../utils/markdownPrompt';

export async function GenerateClaude(prompt: string, temperature: number){
  try{
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API,
      dangerouslyAllowBrowser:true // defaults to process.env["ANTHROPIC_API_KEY"]
    });
    const markdownPrompt = handlePrompt(temperature, prompt)
    const msg = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      messages: [{ role: "user", content: markdownPrompt }],
      temperature: temperature
    });
    const text = (msg.content[0] as Anthropic.TextBlock).text;
    return text
  }catch(error){
    console.error('Claude API Error', error.message || error)
    return 'Sorry this model currently unavailable'
  }

}
