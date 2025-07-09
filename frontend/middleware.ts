import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get('Authorization');
    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ['/dashboard', '/courses', '/profile'];
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));


    // if(isProtected && !token) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }


    // if(token && pathname === '/login') {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

}

export const config = {
    matcher: [ '/((?!api|_next/static|_next/image|favicon.ico|public).*)']
}