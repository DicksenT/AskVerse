// src/components/MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

/** Preprocess Markdown to improve line breaks & clarity */
function preprocessMarkdown(md: string): string {
  return md
    .replace(/^\*\*\*$/gm, '---') // fix: horizontal rule
    .replace(/(?<!\n)\n(?!\n)/g, '  \n') // line break = <br />
    .replace(/([^\n])\n(?=[^\n])/g, '$1\n\n'); // ensure paragraph break
}

type MarkdownRendererProps = {
  content: string;
};

/** Renders enhanced Markdown with GFM, raw HTML, syntax highlight, TOC, line breaks */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processed = preprocessMarkdown(content);

  return (
    <ReactMarkdown
      className="prose max-w-full text-text overflow-x-auto text-wrap"
      remarkPlugins={[remarkGfm, remarkBreaks, remarkToc]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {processed}
    </ReactMarkdown>
  );
}
