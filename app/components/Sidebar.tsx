import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { setActiveMenu, setProfileSetting } from "../../redux/stateSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../redux/store"
import Link from "next/link"
import { renameChat } from "../../redux/chatSlice"
import { Confirmation } from "./Confirmation"
import { useSession } from "next-auth/react"
import { chatStructure } from "../interfaces"

interface sideBarProps{
   width: number
}

const Sidebar:React.FC<sideBarProps> = ({width}) =>{
   const {data: session} = useSession()
   const appDispatch = () => useDispatch<AppDispatch>()
   const dispatch = appDispatch()
   const sidebarActive = useSelector((state: RootState) => state.state.activeMenu)
   const chats = useSelector((state: RootState) =>  Object.values(state.chats.chats))
   const [signOutOption, setSignOutOption] = useState<boolean>(false)
   const [confirmSignout, setConfirmSignout] = useState<boolean>(false)
   const ellipsisRef = useRef(null)

 return(
      //background
   <div className={`bg-black bg-opacity-50 h-screen  top-0 left-0
                  transition-all duration-500 ease-in-out z-50
                  ${sidebarActive ?  'translate-x-0' : '-translate-x-full'}
                  ${width > 768 ? 'w-[20%] translate-x-0' : 'absolute  w-screen'}`}>
      <aside className={`h-screen z-20 bg-background text-text opacity-100 py-6 px-4 flex flex-col justify-between
              transition-all duration-1000 ease-in-out
              ${width > 768? 'w-full border-r' : 'w-[80%]'}`}>
         <nav className="py-4">
            <div className="flex justify-between pb-4 px-1">
               <Link href={'/agora'}>
               <div className="flex">
                  <h1 className="font-black ml-2">AskVerse</h1>
               </div>
               </Link>
               {width <=768 &&
               <button onClick={() => dispatch(setActiveMenu())}>
                  <Image src='/close.svg' alt="close button" width={20} height={20}/>
               </button>}
            </div>

            <h4 className="text-neutral-600 font-semibold">Past Chats</h4>
            <ul>
               {chats.map((chat, i)=> (
                  <PastChat chat={chat} key={i}/>
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
            <div className="flex items-center px-3.5 py-2.5 justify-between relative">
               {session?.user.email.split('@')[0]}
               <button onClick={() => setSignOutOption(prevState => !prevState)}>
                  <Image src='/ellipsis.svg' alt="ellipsis button" width={20} height={20}/> 
               </button>
               {signOutOption && 
               <div className="absolute bg-chatBackground rounded-xl bottom-8 -right-4 p-2">
                  <button className="text-red-500 text-xs" onClick={() => setConfirmSignout(true)}>Sign Out</button>
               </div>}
               {confirmSignout && <Confirmation text="Sign Out?" setWindow={setConfirmSignout} purpose="SIGNOUT"/>}
            </div>
         </div>
      </aside>          
    </div>
 )
}


const PastChat = ({chat}: {chat: chatStructure}) =>{
   const [renameActive, setRenameActive] = useState<boolean>(false)
   const [renameInput, setRenameInput] = useState<string>('')
   const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
   const dispatch = useDispatch<AppDispatch>()
   const handleRename = async(chatId: string, newName: string) =>{
      setRenameInput(newName)
      const renamed = await dispatch(renameChat({chatId, newName})).unwrap()
      setRenameInput('')
      setRenameActive(false)
   }

   const[chatOption, setChatOption] = useState<boolean>(false)
   const ellipsisRef = useRef(null)
   const inputRef = useRef(null)
   useEffect(() =>{
      const handleClick = (e)=>{

         if(ellipsisRef.current && !ellipsisRef.current.contains(e.target)){
            setChatOption(false)
         }
         if(inputRef.current && !inputRef.current.contains(e.target) && !ellipsisRef.current.contains(e.target)){
            setRenameActive(false)
         }
      }
      window.addEventListener('click', handleClick)
      return ()=>{window.removeEventListener('click', handleClick)}
   },[])

   return(
      
         <li className="flex gap-3 w-full justify-between items-center text-sm">
            <div  className="flex w-full items-center px-2 h-8 gap-3" key={chat._id}>
               <Image src={`/file-inactive.svg`} alt="file logo" width={20} height={20}/>
               <p className="w-[calc(100%-20px-24px)] text-clip overflow-hidden whitespace-nowrap font-semibold">
                  {renameActive ? <input ref={inputRef} className="outline-none bg-chatBackground w-[100%] rounded text-text p-1 text-sm"
                              value={renameInput} 
                              onChange={(e) => setRenameInput(e.currentTarget.value)} 
                              onKeyDown={(e) => {
                                 if(e.key === 'Enter' && !e.shiftKey){
                                    handleRename(chat._id, renameInput)
                                 }
                              }}/> 
                              : 
                              <Link href={`/agora/${chat._id}`} className="overflow-ellipsis">{chat.name}</Link>}</p>
            </div>
            <div className="relative"  ref={ellipsisRef}>
               <Image src={'/ellipsis.svg'} alt="ellipsis logo" width={20} height={20} onClick={() => setChatOption(!chatOption)} className="cursor-pointer"/>
                  {chatOption && 
               <div className="absolute flex flex-col z-50 bg-chatBackground text-xs font-bold py-2 px-1 gap-3 rounded-xl w-24 -left-4">
                  <button className="flex items-center px-2 py-2 rounded-lg hover:bg-chat" onClick={() => {setRenameActive(true), setRenameInput(chat.name), setTimeout(()=>setChatOption(false),0)}}>
                     <Image src='/pencil-line.svg' alt="rename logo" width={20} height={20}/>
                     Rename
                  </button>
                  <button onClick={() => setConfirmDelete(true)}
                     className="text-red-500 flex items-center  px-2 py-2 rounded-lg hover:bg-chat">
                     <Image src='/delete-bin-line.svg' alt="delete logo" width={20} height={20}/>
                     Delete
                  </button>
                  {confirmDelete && 
                  <Confirmation text={`delete ${chat.name}?`} setWindow={setConfirmDelete} purpose="DELETE" chatId={chat._id}/>}
               </div>}
            </div>
         </li>
   )
}
export default Sidebar