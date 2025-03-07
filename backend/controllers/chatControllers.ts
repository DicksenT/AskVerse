import {dbConnect} from "../../app/lib/dbConnect";
import Chat from "../models/chatModel";

export async function createChat(userId: string, chatName: string){
    await dbConnect()
    try{
        if(!userId || !chatName){
            throw new Error('Chat name and user id is required')
        }
        const newChat = await Chat.create({userId, name: chatName, messages: []})
        return newChat
    }catch(error){
        console.error('Error in createChat', error)
        throw new Error(error.messages || 'failed to create chat')
    }
   
}

export async function deleteChat(chatId: string){
    await dbConnect()
    await Chat.findOneAndDelete({id: chatId})

}