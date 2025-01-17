import Image from "next/image";
import React from "react";

const Header = ()=>{
    return (
        <header>
            <Image src='/chatLogo.svg' alt="Site Logo" width={32} height={32}/>
        </header>
    )
}

export default Header