'use client'
import React from "react";
import { ModelList } from "./components/ModelList";
import Link from "next/link";



export default function LandingPage(){
    const pros = [
        {
            main: 'Multi-AI Insight',
            exp: 'Get different perspectives from top AI models.'
        },
        {
            main: 'Compare & Choose',
            exp: 'Compare each responses, and pick the one fit you'
        },
        {
            main: 'Fast & Interactive',
            exp: 'No more switching between AI platform, We brings them all to you.'
        }
    ]
    return(
       <main className="flex justify-center items-center h-screen">
        <section className="max-w-3xl flex flex-col justify-center items-center text-center gap-5 w-full">
            <h1 className="font-medium text-4xl"><span className="font-black text-2xl">AskVerse</span><br/>Your Multi-AI Answer Hub</h1>
            <div className="">Tired of relying on just one AI? AskVerse lets you ask questions and receive responses from multiple AI {<ModelList/>} in one place! Compare answers, gain diverse insights, and choose the response that best suits your needs.</div>
            <h2 className="mt-10 font-extrabold ">Why AskVerse?</h2>
            <ul className="flex-col gap-2 flex">
                {pros.map((pro) =>(
                    <li className="flex" key={pro.main}>
                        <span className="font-bold">{pro.main}</span> - {pro.exp}
                    </li>
                ))}
            </ul>
            <h3 className="font-bold">Ask.Compare.Learn</h3>
            <Link href={'/login'}>
            <button className="border p-2 rounded-md hover:bg-text hover:text-background transition-all duration-500 ">Start exploring</button>
            </Link>
        </section>
        </main>
    )
}