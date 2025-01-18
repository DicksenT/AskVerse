import type { Metadata } from "next";
import React from "react";
import Header from "./components/Header";
import './globals.css';
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
        <main className="h-[calc(100vh-71px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
