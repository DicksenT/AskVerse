import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../middleware/requireAuth";
import { deleteChat } from "../../../../backend/controllers/chatControllers";
import { Types } from "mongoose";

export async function DELETE(req: NextRequest, {params}: {params: {chatId:string}}){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const userId = auth.userId
        const {chatId} = params
        const deletedChat = await deleteChat(new Types.ObjectId(userId), new Types.ObjectId(chatId))
        return NextResponse.json({message: 'successfully delete Chat'}, {status: 204})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}