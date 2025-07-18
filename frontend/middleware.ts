import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose'; // Use jose instead of jsonwebtoken for Edge Runtime

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('Authorization')?.value; // Don't forget .value
    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ['/dashboard', '/courses', '/profile'];
    const AUTH_ROUTES = ['/login', '/signup'];

    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

    let isValidToken = false;
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!); // Remove NEXT_PUBLIC_
            await jwtVerify(token, secret);
            isValidToken = true;
        } catch (error) {
            isValidToken = false;
        }
    }

    if (isProtected && !isValidToken) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('Authorization');
        return response;
    }

    if (isAuthRoute && isValidToken) {
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