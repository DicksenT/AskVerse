'use client'

import Image from "next/image";
import React, { useEffect } from "react";
import { Response } from "../components/Response";
import { Loading } from "../components/Loading";
import { useSession } from "next-auth/react";
import { AllResponse } from "../components/AllResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Feature{
  name:string;
  desc:string;
  img:string;
  bgColor:string
}

const features: Feature[] =[
  {
    "name": "Draft E-mail",
    "desc": "Generate email for any occassion",
    "img": '/mail.svg',
    "bgColor": "bg-indigo-50",
  },
  {
    "name": "Write an Essay",
    "desc": "Genereate essay just for you",
    "img":"/pen.svg",
    'bgColor': "bg-green-50"
  },
  {
    "name": 'Planning',
    "desc": "Plan for anything",
    "img": "/plan.svg",
    "bgColor": "bg-fuchsia-50"
  },
  {
    "name": 'Assistant',
    "desc": "Become your No.1 Personal Assistant",
    "img": '/chat.svg',
    "bgColor": "bg-amber-50"
  }
]


const result = {
  'OpenAI': 'This is OpenAI Result',
  'Gemini': ". bbhjr.",
  'Claude': 'This is claude Result',
  'Cohere': 'This is Cohere Result',
  'DeepSeek': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  'msgId': 'as',
  '_id': '123',
  'isLoading': false
}
export default function Home() {
    const {data: session} = useSession()
    const activeChat = useSelector((state: RootState) => state.chats.activeChat)
    useEffect(() =>{activeChat},[activeChat])
  return (
    <section className="pt-10">
      <h3 className="text-2xl mb-16">
        <span className="font-bold ">
          Welcome to AskVerse &nbsp;
        </span>
         Your AI assistant and companion
      </h3>
      <ul className="flex flex-wrap gap-4 justify-center">
        {features.map((feature, i) =>(
          <li key={i} className="w-[180px] flex flex-col gap-6 p-4 rounded-lg border border-solid border-neutral-200">
            <div className={`flex justify-center items-center w-12 h-12 p-2 rounded-lg ${feature.bgColor}`}>
              <Image src={feature.img} width={24} height={24} alt={feature.name}/>
            </div>
            <h4 className='font-bold'>{feature.name}</h4>
            <p>{feature.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}