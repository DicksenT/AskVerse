'use client'
import React, { Suspense } from "react"
import LoginPage from "./LoginPage"

export default function Page(){
    return(
        <Suspense>
            <LoginPage/>
        </Suspense>
    )
}
