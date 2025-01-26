
import type { Metadata } from "next";
import React from "react";
import './globals.css';
import Input from "./components/Input";
import ProvidedComponent from "./components/ProvidedComponent";
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
        <ProvidedComponent>
          {children}
        </ProvidedComponent>
      </body>
    </html>
  );
}
