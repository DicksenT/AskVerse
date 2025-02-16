import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu} from "../../redux/sidebarSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Link from "next/link";

const Header = ()=>{
    const appDispatch = () => useDispatch<AppDispatch>()
    const sidebarActive = useSelector((state: RootState) => state.sidebar.activeMenu)
    const dispacth = appDispatch()
    return (
        <header className="flex justify-between py-4 px-3 border-b md:px-8">
            <Link href={'/'}>
                <div className="flex items-center">
                    <Image src='/chatLogo.svg' alt="Site Logo" width={32} height={32}/>
                    <h1 className="font-bold ml-2">Chat AI</h1>
                </div>
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