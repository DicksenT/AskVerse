import { configureStore } from "@reduxjs/toolkit";
import stateReducer from './stateSlice'
import chatSliceReducer from './chatSlice'
import messageSliceReducer from './messageSlice'

export const store = configureStore({
    reducer:{
        state: stateReducer,
        chats: chatSliceReducer,
        messages: messageSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store