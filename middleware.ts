import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    const url = req.nextUrl
    if(!token && url.pathname.startsWith('/agora')){
        return NextResponse.redirect(new URL('/', req.url))
    }
    else if (token && url.pathname.startsWith("/agora")) {
        return NextResponse.next(); // Allow access
    }

    else if(token && url.pathname.startsWith('/')){
        return NextResponse.redirect(new URL('/agora', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/agora/:path*', '/'],
};