import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isAdminPath = path.startsWith('/admin')
    const token = request.cookies.get('jwt')?.value

    if (isAdminPath && path !== '/admin') {
        if (!token) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*'
}
