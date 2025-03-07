import { NextRequest, NextResponse } from "next/server";
import { createChat } from "../../../backend/controllers/chatControllers";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { requireAuth } from "../../middleware/requireAuth";

export async function POST(req: NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const userId = auth.userId
        const body = await req.json()
        const newChat = await createChat(userId, body)
        return NextResponse.json({message: 'Chat Created', chat: newChat}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message})
    }
}