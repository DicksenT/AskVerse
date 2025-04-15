import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function requireAuth(req: NextRequest){
    try{
        const session = await getServerSession({req, ...authOptions})
        if(!session || !session.user){
            return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        }
        return {userId: session.user.id}
    }catch(error){
        console.error('error: ', error)
        return NextResponse.json({error: 'Authentication failed'}, {status: 401})
    }
}