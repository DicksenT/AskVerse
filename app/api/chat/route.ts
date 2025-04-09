import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../lib/requireAuth";
import { createChat, getChat } from "../../../backend/controllers/chatControllers";
import { Types } from "mongoose";

//fetch chat
export async function GET(req:NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth 
        const userId = auth.userId
        const chats = await getChat(new Types.ObjectId(userId))
        console.log('chat fetchd ',chats)
        return NextResponse.json({message: 'chats successfully fetched', data: chats}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error.message}, {status:400})
    }
}

//post chat
export async function POST(req: NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const userId = auth.userId
        const {name} = await req.json()
        const newChat = await createChat(new Types.ObjectId(userId), name)
        return NextResponse.json({message: 'Chat Created', data: newChat}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message})
    }
}