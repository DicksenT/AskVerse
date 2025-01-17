import type { Metadata } from "next";
import React from "react";
import Header from "./components/Header";
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
        {children}
      </body>
    </html>
  );
}
