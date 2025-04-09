import { NextRequest, NextResponse } from "next/server";
import { addUser } from "../../../../backend/controllers/userController";
import { requireAuth } from "../../../lib/requireAuth";

export async function POST(req: NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth instanceof NextResponse) return auth
        const {email, password} = await req.json()
        const newUser = await addUser(email, password)
        return NextResponse.json({message: 'User Created', data: newUser}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message},{status: 400})
    }
}