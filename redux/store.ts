import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sidebarSlice'
import chatSliceReducer from './chatSlice'

export const store = configureStore({
    reducer:{
        sidebar: sidebarReducer,
        chats: chatSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store