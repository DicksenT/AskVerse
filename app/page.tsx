import Image from "next/image";
import React from "react";

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

export default function Home() {
  return (
    <main>

    </main>
  );
}