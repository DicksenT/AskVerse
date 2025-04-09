
import type { Metadata } from "next";
import React from "react";
import './globals.css';
export const metadata: Metadata = {
  title: "AskVerse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-chat text-text">
        
          {children}
   
      </body>
    </html>
  );
}
