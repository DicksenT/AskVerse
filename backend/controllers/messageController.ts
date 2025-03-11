import { Types } from "mongoose";
import { dbConnect } from "../../app/lib/dbConnect";
import Message from "../models/messageModel";
import Response, { IResponse } from "../models/responseModel";
import Chat from "../models/chatModel";


export async function addMessage(userId: Types.ObjectId,chatId: Types.ObjectId, question: string){
    await dbConnect()
    try{
        if(!chatId || !question){
            throw new Error('chatId and question is required')
        }
        const existChat = await Chat.findOne({userId, _id:chatId})
        if(!existChat) throw new Error("chat is not exist")
        const newMessage = await Message.create({chatId, question})
        await Chat.updateOne({_id: chatId}, {$push: {messages: newMessage._id}})
        return newMessage

    }catch(error){
        console.error('failed in addMessage', error)
        throw new Error(error.message || 'failed to create')
    }
}

export async function addResponseToMessage(userId: Types.ObjectId, chatId: Types.ObjectId, msgId: Types.ObjectId, response: Partial<IResponse>){
    await dbConnect()
    try{
        const chat = await Chat.findOne({userId, _id: chatId})
        if(!chat) throw new Error('Unauthorized')

        const message = await Message.findOne({_id: msgId, chatId})
        if(!message) throw new Error('Message do not exist')
        
        const newResponse = await Response.create({
            messageId: msgId,
            ...response
        })
        if(!newResponse) throw new Error('failed to create respomnse')
        
        await Message.updateOne({_id: msgId}, {response: newResponse})
        return newResponse
    }catch(error){
        console.error('failed in addResponseToMessage', error)
        throw new Error(error.message || 'failed to add response')
    }
}