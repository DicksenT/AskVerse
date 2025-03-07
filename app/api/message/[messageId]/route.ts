import { NextRequest, NextResponse } from "next/server";
import { addResponseToMessage } from "../../../../backend/controllers/messageController";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { requireAuth } from "../../../middleware/requireAuth";

export async function PATCH(req:NextRequest, {params}: {params : {messageId: string}}){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const {messageId} = params
        const body = await req.json()
        const response = await addResponseToMessage(messageId, body)
        return NextResponse.json({message: 'succesfully add Response to message', data: response}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}