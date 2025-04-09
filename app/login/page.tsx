'use client'
import React, { useState } from "react"
import {signIn} from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"

export default function LoginPage(){
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return(
        <main className="flex justify-center items-center w-screen h-screen bg-text text-background relative">
            <Link href={'/'}  className="absolute font-black top-5 left-5"><h2 >AskVerse</h2></Link>
            <section className="max-w-2xl min-w-72 min-h-80 border border-background p-10 flex flex-col gap-5">
                <h2 className="text-4xl w-full text-center">Login</h2> 
                <button onClick={() => signIn('google',{callbackUrl: '/'})} className="flex items-center border border-background w-full p-2 rounded-lg">
                    <Image src={'./google.svg'} width={24} height={24} alt="google img"/>
                    Continue with Google
                </button>
                <form action="" className="flex flex-col w-full items-center">
                    <input className="px-4 py-1 rounded-t-lg outline-none border" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <input className="px-4 py-1 rounded-b-lg outline-none border" type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <button className="border border-background w-1/2 p-1 mt-10 font-bold rounded-lg">Login</button>
                </form>
            </section>  
        </main>
    )
}