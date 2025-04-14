import { dbConnect } from "../../app/lib/dbConnect";
import User from "../models/userModel";
import {z} from 'zod'
import bcrypt from 'bcryptjs'

const signUpScheme = z.object({
    email: z.string().email('please provide valid email'),
    password: z.string().min(6, 'password must be atleast 6 character')
})

export async function addUser(email: string, password: string){
    await dbConnect()
    try{
        if(!email || !password){
            throw new Error('Email and password required')
        }
        signUpScheme.parse({email, password})

        const existUser = await User.findOne({email})
        if(existUser) throw new Error('user already existed')

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            chats: []
        }) 
        return newUser
    }catch(error){
        console.error('Error in addUser', error)
        throw new Error(error.message || 'failed to create user')
    }
}

export async function addPassword(email: string, newPassword: string){
    await dbConnect()
    try{
        if(!newPassword){
            throw new Error('Password is required')
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        const editedUser = await User.findOneAndUpdate({email}, {password: hashedPassword}, {new:true})
        return editedUser
    }catch(error){
        console.error('Error in addPassword', error)
        throw new Error(error.message || 'failed to add password')
    }
}