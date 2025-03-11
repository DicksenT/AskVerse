import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { setActiveMenu, setProfileSetting } from "../../redux/sidebarSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../redux/store"
import Link from "next/link"

interface sideBarProps{
   width: number
}

const Sidebar:React.FC<sideBarProps> = ({width}) =>{
   const appDispatch = () => useDispatch<AppDispatch>()
   const dispatch = appDispatch()
   const sidebarActive = useSelector((state: RootState) => state.sidebar.activeMenu)
   const chats = useSelector((state: RootState) => Object.entries(state.chats.chats))
   
   const [renameActive, setRenameActive] = useState<boolean>(false)
   const[chatOption, setChatOption] = useState<boolean>(false)
   const ellipsisRef = useRef(null)
   useEffect(() =>{
      const handleClick = (e)=>{
         if(ellipsisRef.current && !ellipsisRef.current.contains(e.target)){
            setChatOption(false)
         }
      }
      window.addEventListener('click', handleClick)
      return ()=>{window.removeEventListener('click', handleClick)}
   },[])
 return(
   //background
   <div className={`bg-black bg-opacity-50 h-screen  top-0 left-0
                  transition-all duration-500 ease-in-out z-50
                  ${sidebarActive ?  'translate-x-0' : '-translate-x-full'}
                  ${width > 768 ? 'w-[25%] translate-x-0' : 'absolute  w-screen'}`}>
      <aside className={`h-screen z-20 bg-white opacity-100 py-6 px-4 flex flex-col justify-between
              transition-all duration-1000 ease-in-out
              ${width > 768? 'w-full border-r' : 'w-[80%]'}`}>
         <nav className="py-4">
            <div className="flex justify-between pb-4 px-1">
               <Link href={'/'}>
               <div className="flex">
                  <Image src='/chatLogo.svg' alt="chat logo" width={20} height={20}/>
                  <h1 className="font-bold ml-2">Chat AI</h1>
               </div>
               </Link>
               {width <=768 &&
               <button onClick={() => dispatch(setActiveMenu())}>
                  <Image src='/close.svg' alt="close button" width={20} height={20}/>
               </button>}
               
            </div>

            <h4 className="text-neutral-600 font-semibold">Past Chats</h4>

            <ul>
               {chats.map(([_, chat], i) => (
                  <Link href={`/${chat.id}`} key={i}>
                  <li className="flex gap-3 items-center px-2 h-8">
                     <Image src={`/file-inactive.svg`} alt="file logo" width={20} height={20}/>
                     <p className="w-[calc(100%-20px-24px)] text-clip overflow-hidden whitespace-nowrap font-semibold">{chat.name}</p>
                     <div className="relative"  ref={ellipsisRef}>
                        <Image src={'/ellipsis.svg'} alt="ellipsis logo" width={20} height={20} 
                        onClick={() => setChatOption(!chatOption)} className="pointer"/>
                        {chatOption && <div className="absolute flex flex-col bg-indigo-100 text-xs font-bold py-2 px-1 gap-3 rounded-xl w-24 -left-4">
                           <button className="flex items-center px-2 py-2 rounded-lg hover:bg-indigo-50">
                              <Image src='/pencil-line.svg' alt="rename logo" width={20} height={20}/>
                              Rename
                           </button>
                           <button className="text-red-500 flex items-center  px-2 py-2 rounded-lg hover:bg-indigo-50">
                              <Image src='delete-bin-line.svg' alt="delete logo" width={20} height={20}/>
                              Delete
                           </button>
                        </div>}
                     </div>
                  </li>
                  </Link>
               ))}
            </ul>
         </nav>

         <div className="">
            <Link href={'/'} onClick={() => dispatch(setActiveMenu())}>
            <button className="flex gap-1 items-center w-full px-3.5 py-2.5 rounded border-[0.5px] border-solid border-neutral-200">
               <Image src='/start-chat.svg' alt="Start chat logo" width={20} height={20}/>
               Start new chat
            </button>
            </Link>
            <div className="flex items-center px-3.5 py-2.5 justify-between">
               John Doe
               <button>
                  <Image src='/ellipsis.svg' alt="ellipsis button" width={20} height={20}/> 
               </button>
            </div>
         </div>
      </aside>          
    </div>
 )
}
export default Sidebar