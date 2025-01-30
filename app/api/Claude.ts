import Anthropic from '@anthropic-ai/sdk';

export async function GenerateClaude(prompt: string){
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API,
  dangerouslyAllowBrowser:true // defaults to process.env["ANTHROPIC_API_KEY"]
});

const msg = await anthropic.messages.create({
  model: "claude-3-5-haiku-latest",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
});
const text = (msg.content[0] as Anthropic.TextBlock).text;
return text
}
