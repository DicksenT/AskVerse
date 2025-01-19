import type { Metadata } from "next";
import React from "react";
import Header from "./components/Header";
import './globals.css';
import Input from "./components/Input";
export const metadata: Metadata = {
  title: "Chat AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className="h-[calc(100vh-71px)] pt-12 pb-24 px-4 overflow-y-auto">
          {children}
          <Input/>
        </main>
      </body>
    </html>
  );
}
