import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import { addMessage } from "../../../backend/controllers/messageController";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest){
    try{
        const session = await getServerSession(authOptions)
        if(!session || session.user) return NextResponse.json({error: 'unauthorized'}, {status: 401})
        const {chatId, question} = await req.json()
        const newMessage = await addMessage(chatId, question)
        return NextResponse.json({message: 'Message Created', data: newMessage}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}