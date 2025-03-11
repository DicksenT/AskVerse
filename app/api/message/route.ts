import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "../../../backend/controllers/messageController";
import { requireAuth } from "../../middleware/requireAuth";
import { Types } from "mongoose";

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