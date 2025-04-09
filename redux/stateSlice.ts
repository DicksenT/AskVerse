import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'sidebar',
    initialState:{
        activeMenu: false,
        profileSetting: false,
        width: 1024,
    },
    reducers:{
        setActiveMenu: (state) =>{
            state.activeMenu = !state.activeMenu
        },
        setProfileSetting: (state) =>{
            state.profileSetting = !state.profileSetting
        },
        setWidth: (state, action: PayloadAction<number>) =>{
            state.width = action.payload
        },

    }
})
export const {setActiveMenu, setProfileSetting,setWidth} = stateSlice.actions
export default stateSlice.reducer
