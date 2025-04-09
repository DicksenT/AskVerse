export interface responseStructure{
    _id?: string
    msgId: string
    OpenAI: string | null
    Gemini: string | null
    Cohere: string | null
    DeepSeek: string | null
    Claude: string | null
    personality: string
    isLoading?: boolean
 
}

export interface messageStructure{
    _id?: string
    question:string
    chatId: string
    response: responseStructure[]
}

export interface chatStructure{
    _id?: string
    userId: string
    name: string
    messages: string[]
}

export interface chatState{
    activeChat: string
    chats: Record<string,chatStructure>
}

export interface messageState{
    messages: Record<string, messageStructure>
}