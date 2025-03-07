import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, dbConnect } from "../../../lib/dbConnect";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import User from "../../../../backend/models/userModel";
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions ={
    adapter: MongoDBAdapter(clientPromise),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
                if(!user){
                    return null
                }
                const pass = await bcrypt.compare(credentials.password, user.password)
                if(!pass){
                    return null
                }
                return {
                    id: user._id.toString(),
                    email: user.email
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH,
    callbacks:{
        async signIn({user}){
            await dbConnect()
            const existedUser = await User.findOne({email: user.email})
            if(!existedUser){
                await User.create({
                    email: user.email,
                    image: user.image,
                    chats: []
                })
            }
            return true
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
    }

    
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}