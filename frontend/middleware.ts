import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get('Authorization');
    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ['/dashboard', '/courses', '/profile'];
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));


    if (isProtected && !token) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(redirectUrl);
    }


    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const response = NextResponse.next();

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)']
}