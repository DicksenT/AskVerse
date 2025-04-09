import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../lib/requireAuth";
import { deleteChat, renameChat } from "../../../../backend/controllers/chatControllers";
import { Types } from "mongoose";

//delete chat
export async function DELETE(req: NextRequest, {params}: {params: {chatId:string}}){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const userId = auth.userId
        const {chatId} = await params
        const deletedChat = await deleteChat(new Types.ObjectId(userId), new Types.ObjectId(chatId))
        return NextResponse.json({message: 'successfully delete Chat', data: deletedChat}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}

//rename chat
export async function PATCH(req: NextRequest, {params} : {params : {chatId: string}}){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse)return auth
        const {chatId} = params
        const {newName} = await req.json()
        const renamedChat = await renameChat(new Types.ObjectId(auth.userId), new Types.ObjectId(chatId), newName)
        return NextResponse.json({message: 'chat successfully renamed', data: renamedChat}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}