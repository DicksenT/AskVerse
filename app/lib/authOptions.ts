import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";

import bcrypt from 'bcryptjs'
import { addPassword, addUser } from "../../backend/controllers/userController";
import { clientPromise, dbConnect } from "./dbConnect";
import User from "../../backend/models/userModel";


export const authOptions: AuthOptions ={
    adapter: MongoDBAdapter(clientPromise),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            name:'Credentials',
            credentials:{
                email:{label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials){
                await dbConnect()

                const user = await User.findOne({email: credentials.email})
                if(user){
                    if(!user.password){
                        const editedUser = await addPassword(credentials.email, credentials.password)
         
                        if(!editedUser) return null
                        return{
                            id: editedUser._id.toString(),
                            email: editedUser.email
                        }
                    }
                    const pass = await bcrypt.compare(credentials.password, user.password)
                    if(!pass) return null
                return {
                    id: user._id.toString(),
                    email: user.email
                }
                }
                else{
                    const newUser = await addUser(credentials.email, credentials.password)
                    if(newUser){
                        return {id: newUser._id.toString(), email: newUser.email}
                    }
                }
                return null
                
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async redirect({baseUrl}){
            return `${baseUrl}/agora`
        },
        async signIn({user}){
            await dbConnect()
            const existedUser = await User.findOne({ email: user.email })
            try{
                if(existedUser){
                    return true
                }
                else{
                    await User.create({
                        email: user.email,
                        image: user.image,
                        chats: []
                    })
                return true
                }
            }catch(error){
                console.error('error in SignIn', error)
                return false
            }
        },
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            session.user.id = token.id as string
            return session
        }
    },
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login',
        error: '/login'
    }

    
}