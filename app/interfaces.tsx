export interface responseStructure{
    OpenAI: string | null
    Gemini: string | null
    Cohere: string | null
    DeepSeek: string | null
    Claude: string | null
    isLoading?: boolean
}

export interface messageStructure{
    id: string
    question:string
    chatId: string
    response: responseStructure
}

export interface chatStructure{
    name: string
    id: string
    chatListsId: string[]
}

export interface chatState{
    activeChat: string
    chats: Record<string,chatStructure>
    messages: Record<string, messageStructure>
}