import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";

import bcrypt from 'bcryptjs'
import { addPassword, addUser } from "../../backend/controllers/userController";
import { clientPromise, dbConnect } from "./dbConnect";
import User from "../../backend/models/userModel";

const attempts = new Map()
function tooManyAttempt(email: string){
    const now = Date.now()
    const record = attempts.get(email) || {count: 0, last: now}
    if(now - record.last > 60_000){
        attempts.set(email, {count: 1, last: now})
        return false
    }
    record.count += 1
    record.last = now
    attempts.set(email, record)
    return record.count > 5
}
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

                if(!credentials.email || !credentials.password) return null
                const email = credentials.email.trim().toLowerCase()
                const password = credentials.password
                if(!email || password.length < 3) return null
                if(tooManyAttempt(email)) return null
                const user = await User.findOne({email})
                if(user){
                    if(!user.password){
                        const editedUser = await addPassword(email, credentials.password)
         
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
                    const newUser = await addUser(email, credentials.password)
                    if(newUser){
                        return {id: newUser._id.toString(), email: newUser.email}
                    }
                }
                return null
                
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt:{
        maxAge: 24 * 60 *60,
    },
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
    },
    cookies: {
    sessionToken: {
    name: '__Secure-next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true
    },
  },
},

    
}