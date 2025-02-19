import Anthropic from '@anthropic-ai/sdk';

export async function GenerateClaude(prompt: string){
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API,
  dangerouslyAllowBrowser:true // defaults to process.env["ANTHROPIC_API_KEY"]
});
const markdownPrompt = `Please answer the following question using rich Markdown formatting—including headings, lists, code blocks, tables, and other relevant elements—optimized for rendering with the "react-markdown" library, along with "remark-gfm" and "rehype" plugins. Ensure the formatting includes appropriate spacing and line breaks to enhance readability and prevent content from appearing cluttered. Here is the question: ${prompt}`;
const msg = await anthropic.messages.create({
  model: "claude-3-5-haiku-latest",
  max_tokens: 1024,
  messages: [{ role: "user", content: markdownPrompt }],
});
const text = (msg.content[0] as Anthropic.TextBlock).text;
return text
}
