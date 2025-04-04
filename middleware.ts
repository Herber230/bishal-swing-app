import createMiddleware from 'next-intl/middleware';
import { auth, unProtectedRoutes, SIGN_IN_ROUTE, HOME_ROUTE } from '@/auth';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const checkBaseRoute = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/' || routing.locales.find(l => pathname === `/${l}`))
    return new URL(HOME_ROUTE, request.nextUrl.origin);
};

const checkAuthRoutes = async (request: NextRequest) => {
  const session = await auth();
  const isUnprotectedRoute = unProtectedRoutes.some(route =>
    request.nextUrl.pathname.endsWith(route),
  );
  const isAuthRoute = request.nextUrl.pathname.includes('/auth/');

  if (!session && !isUnprotectedRoute)
    return new URL(SIGN_IN_ROUTE, request.nextUrl.origin);

  if (session && isAuthRoute)
    return new URL(HOME_ROUTE, request.nextUrl.origin);
};

/**
 * Middleware for the application.
 * This is the main function that will be called for each request and fulfills the role of a middleware.
 * @param request - The next incoming request
 * @returns
 */
export async function middleware(request: NextRequest) {
  const redirectionChecks = [checkBaseRoute, checkAuthRoutes];

  for (const check of redirectionChecks) {
    const url = await check(request);
    if (url) return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
