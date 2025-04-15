'use client'
import React from "react";
import ProvidedComponent from "../components/ProvidedComponent";
import { Provider}  from "react-redux";
import store from "../../redux/store";


export default function AgoraLayout({children}: {children: React.ReactNode}){

    return(
        <Provider store={store}>
        <ProvidedComponent>
            {children}
        </ProvidedComponent>
        </Provider>
    )
}