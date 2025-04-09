import { chatStructure, messageStructure, responseStructure } from "../interfaces";

export const transformMessage = (message: any): messageStructure =>({
    //dont need to stringify _id since mongo auto-conver
    _id: message._id,
    question: message.question,
    //stringify the chat id since it not auto-convert
    chatId: message.chatId.toString(),
    response: [{...message.response, isLoading: true}]
})

export const transformChat = (chat: any): chatStructure =>({
    _id: chat._id,
    userId: chat.userId.toString(),
    name: chat.name,
    messages: chat.messages.map((message:any) =>message.toString())
})

export const transformResponse = (response: any): responseStructure=>({
    _id: response._id,
    msgId: response.msgId.toString(),
    isLoading: false,
    personality: response.personality,
    OpenAI: response.OpenAI,
    Gemini: response.Gemini,
    Claude: response.Claude,
    DeepSeek: response.DeepSeek,
    Cohere: response.Cohere,
})