import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../middleware/requireAuth";
import { createChat, getChat } from "../../../backend/controllers/chatControllers";
import { Types } from "mongoose";

export async function GET(req:NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth 
        const userId = auth.userId
        const chats = await getChat(new Types.ObjectId(userId))
        return NextResponse.json({message: 'chats successfully fetched', data: chats}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error.message}, {status:400})
    }
}
export async function POST(req: NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const userId = auth.userId
        const body = await req.json()
        const newChat = await createChat(new Types.ObjectId(userId), body.question)
        return NextResponse.json({message: 'Chat Created', chat: newChat}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message})
    }
}