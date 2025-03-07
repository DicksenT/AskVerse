import { dbConnect } from "../../app/lib/dbConnect";
import Message from "../models/messageModel";
import Response, { IResponse } from "../models/responseModel";


export async function addMessage(chatId: string, question: string){
    await dbConnect()
    try{

        if(!chatId || !question){
            throw new Error('chatId and question is required')
        }
        const newMessage = await Message.create({chatId: chatId, question: question})
        return newMessage

    }catch(error){
        console.error('failed in addMessage', error)
        throw new Error(error.message || 'failed to create')
    }
}

export async function addResponseToMessage(msgId: string, response: Partial<IResponse>){
    await dbConnect()
    try{
        const message = await Message.findById(msgId)
        if(!message){
            throw new Error('Message do not exist')
        }
        const newResponse = await Response.create({
            messageId: msgId,
            ...response
        })
        if(!newResponse){
            throw new Error('failed to create respomnse')
        }
        message.response = newResponse._id
        await message.save()
        return newResponse
    }catch(error){
        console.error('failed in addResponseToMessage', error)
        throw new Error(error.message || 'failed to add response')
    }
}