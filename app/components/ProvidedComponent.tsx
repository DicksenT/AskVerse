'use client'

import { Provider } from "react-redux"
import store from "../../redux/store"
import Header from "./Header"
import Input from "./Input"


export default function ProvidedComponent({children}: {children: React.ReactNode}){
    return(
        <Provider store={store}>
            <Header/>
            <main className="h-[calc(100vh-71px)] pt-12 pb-24 px-4 overflow-y-auto">
                {children}
            </main>
            <Input/>
        </Provider>
    )
}