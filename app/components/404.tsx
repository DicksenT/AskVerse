import Image from "next/image";
import React from "react";

export const LostPage =() =>{
    return(
        <article className="relative">
            <Image src={'/404.svg'} alt="404 page" width={520} height={520}/>
            <p className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            <a href="https://storyset.com/web" target="_blank">Web illustrations by Storyset</a>
            </p>
        </article>
    )
} 