import Image from "next/image"
import React, { useEffect } from "react"
import { setActiveMenu, setProfileSetting } from "../../redux/sidebarSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../redux/store"
const Sidebar = () =>{
   const appDispatch = () => useDispatch<AppDispatch>()
   const dispatch = appDispatch()
   const sidebarActive = useSelector((state: RootState) => state.sidebar.activeMenu)
   useEffect(() =>{
      
   },[sidebarActive])
 return(
   //background
   <div className={`bg-black bg-opacity-50 h-screen z-10 absolute top-0 left-0 w-screen  
                  transition-all duration-500 ease-in-out
                  ${sidebarActive ? '-translate-x-full' : 'translate-x-0'}`}>
      <aside className={`h-screen z-20 bg-white opacity-100 py-6 px-4 flex flex-col justify-between
              transition-all duration-1000 ease-in-out
              w-[80%]`}>
         <nav className="py-4">
            <div className="flex justify-between pb-4 px-1">
               <div className="flex">
                  <Image src='/chatLogo.svg' alt="chat logo" width={20} height={20}/>
                  <h1 className="font-bold ml-2">Chat AI</h1>
               </div>
               <button onClick={() => dispatch(setActiveMenu())}>
                  <Image src='/close.svg' alt="close button" width={20} height={20}/>
               </button>
            </div>

            <h4 className="text-neutral-600 font-semibold">Past Chats</h4>

            <ul>
               <li className="flex gap-3 items-center px-2 h-8">
                  <Image src={`/file-inactive.svg`} alt="file logo" width={20} height={20}/>
                  <p className="w-[calc(100%-20px-12px)] text-ellipsis overflow-hidden whitespace-nowrap">API Integration texasdasd</p>
               </li>
               <li className="flex gap-3 items-center px-2 h-8 active text-indigo-700 bg-neutral-50 rounded-lg">
                  <Image src={`/file-active.svg`} alt="file logo" width={20} height={20}/>
                  <p className="w-[calc(100%-20px-12px)] text-ellipsis overflow-hidden whitespace-nowrap">API Integration texasdasd</p>
               </li>
            </ul>
         </nav>

         <div className="">
            <button className="flex gap-1 items-center w-full px-3.5 py-2.5 rounded border-[0.5px] border-solid border-neutral-200">
               <Image src='/start-chat.svg' alt="Start chat logo" width={20} height={20}/>
               Start new chat
            </button>
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