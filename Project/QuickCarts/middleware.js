import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define route classifications
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isSellerRoute = pathname.startsWith('/seller');
  const isApiOrAsset = pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.');

  // Skip processing for API, next.js internals, and static assets
  if (isApiOrAsset) {
    return NextResponse.next();
  }

  if (token) {
    const isSeller = token.role === 'seller';

    // 1. If user is a seller, redirect them away from user routes to the seller dashboard
    if (isSeller && !isSellerRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL('/seller', req.url));
    }

    // 2. If user is a regular user, redirect them away from seller routes to the user home
    if (!isSeller && isSellerRoute) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // 3. Prevent logged-in users from accessing login/register pages
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(isSeller ? '/seller' : '/', req.url));
    }
  } else {
    // 4. If not logged in, redirect any attempt to access the seller dashboard to /login
    if (isSellerRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
