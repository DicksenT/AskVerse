'use client'
import React, { useEffect } from "react";
import ProvidedComponent from "../components/ProvidedComponent";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "../../redux/store";


export default function AgoraLayout({children}: {children: React.ReactNode}){

    return(
        <Provider store={store}>
        <ProvidedComponent>
            {children}
        </ProvidedComponent>
        </Provider>
    )
}