import { chatStructure, messageStructure, responseStructure } from "../interfaces";

export const transformMessage = (message: messageStructure): messageStructure =>({
    //dont need to stringify _id since mongo auto-conver
    _id: message._id,
    question: message.question,
    //stringify the chat id since it not auto-convert
    chatId: message.chatId.toString(),
    response: [{isLoading: true, _id: '', msgId:'', Cohere:null,Gemini:null,OpenAI:null,DeepSeek:null,Claude:null, personality:'normal'}]
})

export const transformChat = (chat: chatStructure): chatStructure =>({
    _id: chat._id,
    userId: chat.userId.toString(),
    name: chat.name,
    messages: chat.messages.map((message:any) =>message.toString())
})

export const transformResponse = (response: Partial<responseStructure>): responseStructure=>({
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