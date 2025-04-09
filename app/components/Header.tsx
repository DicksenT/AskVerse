import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu} from "../../redux/stateSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Link from "next/link";

const Header = ()=>{
    const appDispatch = () => useDispatch<AppDispatch>()
    const dispacth = appDispatch()
    return (
        <header className="flex justify-between py-4 px-3 border-b md:px-8 items-center">
            <Link href={'/agora'}>
                <h1 className="font-bold">AskVerse</h1>
            </Link>
            <nav>
                <button aria-label="open menu" onClick={() => dispacth(setActiveMenu())}>
                    <Image src='/menu.svg' alt="Menu Logo" width={32} height={32}/>
                </button>
            </nav>
          
        </header>
    )
}

export default Header