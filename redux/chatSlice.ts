import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatState, chatStructure } from "../app/interfaces";
import { apiFetch, getFetch } from "../app/utils/api";
import { transformChat } from "../app/utils/transformers";
import { RootState } from "./store";
import { deleteMessages } from "./messageSlice";
import { useRouter } from "next/navigation";


//add chat dispatch
export const addChat = createAsyncThunk<
chatStructure,
string
>
('chats/create', async(name: string, {rejectWithValue}) =>{
    try{
        const newChat: chatStructure =  await apiFetch('/api/chat', 'POST', {name}, transformChat)
    
        if(!newChat) throw new Error('failed to create chat')
        return newChat
    }catch(error){
        return rejectWithValue(error.message || 'unexpected Error')
    }
})


//fetch chat dispatch
export const getChat = createAsyncThunk<
Record<string, chatStructure>,
void
>('chats/getAll', async(_, {rejectWithValue}) =>{
    try{
        return await getFetch('/api/chat', transformChat)
    }catch(error){
        return rejectWithValue(error.message || 'Unexpected Error')
    }
})

//rename chat
export const renameChat = createAsyncThunk<
  chatStructure, 
  { chatId: string; newName: string }
>('chats/rename', async({newName, chatId}, {getState,rejectWithValue}) =>{
    try{
        if(!chatId) return rejectWithValue('no chat selected')
        const updatedChat: chatStructure = await apiFetch(`/api/chat/${chatId}`, 'PATCH', {newName}, transformChat)
        if(!updatedChat) throw new Error('failed to rename chat')
        return updatedChat
    }catch(error){
        return rejectWithValue(error.message || 'Unexpected Error')
    }
})

//delete chat
export const deleteChat = createAsyncThunk<
void,
string
>('chats/delete', async(chatId: string,{dispatch,rejectWithValue})=>{
    try{
        const deletedChat = await apiFetch(`/api/chat/${chatId}`, 'DELETE', {chatId})
        if(!deletedChat) throw new Error('failed to delete chat')
        dispatch(deleteMessages(chatId))
        return 
    }catch(error){
        return rejectWithValue(error.message || 'unexpected error')
    }
})

const initialState: chatState ={
    activeChat: '',
    chats:{},
}


const chatSlice= createSlice({
    name:'chats',
    initialState,
    reducers:{
        setActiveChat: (state, action: PayloadAction<string>)=>{
            state.activeChat = action.payload
        },
        addMessageToChat:(state, action: PayloadAction<{chatId: string, msgId: string}>)=>{
            state.chats[action.payload.chatId].messages.push(action.payload.msgId)
        }
    },
    extraReducers(builder) {
        builder
        .addCase(addChat.fulfilled, (state,action) =>{
            state.chats[action.payload._id] = action.payload
            state.activeChat = action.payload._id
        })
        .addCase(getChat.fulfilled,(state, action) =>{
            state.chats = action.payload
        })
        .addCase(renameChat.fulfilled, (state, action) =>{
            state.chats={
                ...state.chats,
                [action.payload._id]: {
                    ...state.chats[action.payload._id],
                    name: action.payload.name
                }
            }
        })
        .addCase(deleteChat.fulfilled, (state, action) =>{
            const {[action.meta.arg]: _, ...restChat} = state.chats
            state.chats = restChat

        })
    },
})

export const{setActiveChat, addMessageToChat } = chatSlice.actions
export default chatSlice.reducer