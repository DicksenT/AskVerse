import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatListStructure, chatState, chatStructure } from "../app/interface";



const initialState: chatState ={
    activeChat: '',
    chats:{},
    messages:{}
}


const chatSlice= createSlice({
    name:'chats',
    initialState,
    reducers:{
        setActiveChat: (state, action: PayloadAction<string>)=>{
            state.activeChat = action.payload
        },
        addNewChat:(state, action: PayloadAction<chatStructure>)=>{
            state.chats[action.payload.id] = action.payload
        },
        deleteChat:(state, action: PayloadAction<string>)=>{
            const chatId = action.payload
            
            const {[chatId] : _, ...newChat} = state.chats
            state.chats = newChat

            const filteredMessage = Object.entries(state.messages).filter(([_, msg]) => msg.chatId !== chatId)
            state.messages = Object.fromEntries(filteredMessage)
        },
        renameChat:(state, action: PayloadAction<{id: number, newName: string}>)=>{
            state.chats[action.payload.id].name = action.payload.newName
        },
        addMessages:(state, action: PayloadAction<chatListStructure>)=>{
            state.chats[action.payload.chatId].chatListsId.push(action.payload.id)
            state.messages[action.payload.id] = action.payload
        }
    }
})

export const{setActiveChat, addNewChat, deleteChat, renameChat, addMessages} = chatSlice.actions
export default chatSlice.reducer