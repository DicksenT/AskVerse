export interface responseStructure{
    openAIResponse: string | null
    geminiResponse: string | null
    cohereResponse: string | null
    deepseekResponse: string | null
    claudeResponse: string | null
}

export interface chatListStructure{
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
    messages: Record<string, chatListStructure>
}