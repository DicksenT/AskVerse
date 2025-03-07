import { NextRequest, NextResponse } from "next/server";
import { addUser } from "../../../../backend/controllers/userController";

export async function POST(req: NextRequest){
    try{
        const {email, password} = await req.json()
        const newUser = await addUser(email, password)
        return NextResponse.json({message: 'User Created', data: newUser}, {status: 201})
    }catch(error){
        return NextResponse.json({error: error.message},{status: 401})
    }
}