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
    <section>
      <h3 className="text-2xl mb-16">
        <span className="font-bold ">
          Hi, I'm Chat AI &nbsp;
        </span>
         Your AI assistant and companion
      </h3>
      <ul className="flex flex-wrap gap-4 self-stretch justify-center">
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