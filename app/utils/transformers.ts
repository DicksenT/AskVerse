import { chatStructure, messageStructure } from "../interfaces";

export const transformMessage = (message: any): messageStructure =>({
    _id: message._id,
    id: message.id,
    question: message.question,
    chatId: message.chatId.toString(),
    response: {...message.response, isLoading: true}
})

export const transformChat = (chat: any): chatStructure =>({
    _id: chat._id,
    id: chat.id,
    userId: chat.userId.toString(),
    name: chat.name,
    messages: chat.messages.map((message:any) =>message.toString())
})