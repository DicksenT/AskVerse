import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    COHERE_API: process.env.COHERE_API,
    CLAUDE_API: process.env.CLAUDE_API,
    GEMINI_API: process.env.GEMINI_API,
    DEEPSEEK_API: process.env.DEEPSEEK_API,
    OPENAI_API: process.env.OPENAI_API,
  }
};

export default nextConfig;

