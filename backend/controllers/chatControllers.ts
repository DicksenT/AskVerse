import { Types } from "mongoose";
import {dbConnect} from "../../app/lib/dbConnect";
import Chat from "../models/chatModel";
import User from "../models/userModel";

export async function createChat(userId: Types.ObjectId, chatName: string){
    await dbConnect()
    try{
        if(!userId || !chatName) throw new Error('Chat name and user id is required')
        const newChat = await Chat.create({userId, name: chatName, messages: []})
        await User.updateOne({_id: userId}, {$push: {chats: newChat._id}})
        return newChat
    }catch(error){
        console.error('Error in createChat', error)
        throw new Error(error.messages || 'failed to create chat')
    }
}

export async function deleteChat(userId: Types.ObjectId,chatId: Types.ObjectId){
    await dbConnect()
    try{
        if(!userId || !chatId) throw new Error('must provide userid and chatid')
        const chat = await Chat.findOneAndDelete({userId, _id: chatId})
        if(!chat) throw new Error('Chat do not exist')
        return chat
    }catch(error){
        console.error('Error in deleteChat', error)
        throw new Error(error.message || 'failed to delete chat')
    }
}

export async function getChat(userId: Types.ObjectId){
    await dbConnect()
    try{
        const chats = await Chat.find({userId})
        if(!chats){
            throw new Error('Chat with given userId is not found')
        }
        return chats.reverse()
    }catch(error){
        console.error('error in getChat')
        throw new Error(error.message || 'failed to get chat')
    }
}

export async function renameChat(userId: Types.ObjectId, chatId: Types.ObjectId, newName: string){
    await dbConnect()
    try{
        if(!userId || !chatId) throw new Error('must provide userId and chatId')
        const renamedChat = await Chat.findOneAndUpdate({userId, _id: chatId}, {name: newName}, {new:true})
        if(!renamedChat) throw new Error('chat does not exist')
        return renamedChat
    }catch(error){
        console.error('error in renameChat')
        throw new Error(error.message || 'failed to rename chat')
    }
}