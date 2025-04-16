import { NextRequest, NextResponse } from "next/server";
import { addMessage, getMessages } from "../../../../../backend/controllers/messageController";
import { requireAuth } from "../../../../lib/requireAuth";
import { Types } from "mongoose";

//post message
export async function POST(req: NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const {chatId, question} = await req.json()
        const newMessage = await addMessage(new Types.ObjectId(auth.userId),chatId, question)
        return NextResponse.json({message: 'Message Created', data: newMessage}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}

//fetch message
export async function GET(req: NextRequest, context: {params: {chatId: string}}){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const {chatId} =  context.params
        const messages = await getMessages(new Types.ObjectId(auth.userId), new Types.ObjectId(chatId))
 
        return NextResponse.json({messages: 'messages successfully fetched', data: messages}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}