import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState:{
        activeMenu: false,
        profileSetting: false
    },
    reducers:{
        setActiveMenu: (state) =>{
            state.activeMenu = !state.activeMenu
        },
        setProfileSetting: (state) =>{
            state.profileSetting = !state.profileSetting
        }
    }
})
export const {setActiveMenu, setProfileSetting} = sidebarSlice.actions
export default sidebarSlice.reducer