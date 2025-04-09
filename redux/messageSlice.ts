import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageState, messageStructure, responseStructure } from "../app/interfaces";
import { apiFetch, getFetch } from "../app/utils/api";
import { transformMessage, transformResponse } from "../app/utils/transformers";
import { RootState } from "./store";
import { addMessageToChat } from "./chatSlice";


//fetch message based on active chat
export const fetchMessages = createAsyncThunk<
//so the system know what type we returning
Record<string, messageStructure>, 
void
>('messages/get', async(_, {getState, rejectWithValue}) =>{
    try{
        const state = getState() as RootState
        const chatId = state.chats.activeChat
        if(!chatId) return rejectWithValue('no chat selected')
        console.log(chatId)
        return await getFetch<messageStructure>(`/api/chat/${chatId}/message`)
    }catch(error){
        return rejectWithValue(error.message || 'unexpected error')
    }
})


//add message to current chat
export const postMessages = createAsyncThunk('messages/post', async(body: Partial<messageStructure>, {dispatch,getState, rejectWithValue}) =>{
    try{
        const state = getState() as RootState
        const chatId = state.chats.activeChat
        if(!chatId) return rejectWithValue('no chat selected')
        const msg: messageStructure = await apiFetch(`/api/chat/${chatId}/message`, 'POST', body, transformMessage)
        if(!msg) throw new Error('failed to create messages')
        dispatch(addMessageToChat({chatId, msgId: msg._id}))
        return msg
    }catch(error){
        return rejectWithValue(error.message || 'unexpected error')
    }
})

export const addResponse = createAsyncThunk<
responseStructure,
Partial<responseStructure>
>('messages/patch', async(body: Partial<responseStructure>, {getState, rejectWithValue}) =>{
    try{
        const state = getState() as RootState
        const chatId = state.chats.activeChat
        if(!chatId) return rejectWithValue('no chat selected')
        const messageId = body.msgId
        const newResponse:responseStructure = await apiFetch(`/api/chat/${chatId}/message/${messageId}`, 'PATCH', body, transformResponse)
        console.log(state.messages.messages[newResponse.msgId])
        return newResponse
    }catch(error){
        return rejectWithValue(error.message || 'unexpected error')
    }
})

const initialState: messageState={
    messages:{}
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers:{
        deleteMessages: (state, action: PayloadAction<string>) =>{
            const filteredMessage = Object.entries(state.messages).filter(([_,msg]) => msg.chatId !== action.payload)
            state.messages = Object.fromEntries(filteredMessage)
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchMessages.fulfilled, (state, action) =>{
            console.log(action.payload)
            state.messages = {...state.messages, ...action.payload}
        })
        .addCase(postMessages.fulfilled, (state, action) =>{
            state.messages = {[action.payload._id]: action.payload, ...state.messages}
        })
        .addCase(addResponse.fulfilled, (state, action)=>{
            const resp = state.messages[action.payload.msgId].response
            resp[resp.length - 1] = action.payload
        })
    },
})

export const {deleteMessages} = messageSlice.actions
export default messageSlice.reducer