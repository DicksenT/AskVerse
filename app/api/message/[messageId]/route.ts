import { NextRequest, NextResponse } from "next/server";
import { addResponseToMessage } from "../../../../backend/controllers/messageController";
import { requireAuth } from "../../../middleware/requireAuth";
import { Types } from "mongoose";

export async function PATCH(req:NextRequest, {params}: {params : {messageId: string}}){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const {messageId} = params
        const {chatId, response} = await req.json()
        const newResponse = await addResponseToMessage(new Types.ObjectId(auth.userId), new Types.ObjectId(String(chatId)),new Types.ObjectId(messageId), response)
        return NextResponse.json({message: 'succesfully add Response to message', data: response}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}
