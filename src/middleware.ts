import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  const { userId, sessionClaims } = await auth()

  if(isAdminRoute(req)) {
    console.log('Admin route access attempt');
    console.log('User role:', sessionClaims?.metadata);
  }

  if(isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin'){
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

    
    if (userId && isOnboardingRoute(req)) {
      return NextResponse.next()
    }

    if (userId && !sessionClaims?.metadata?.onboardingComplete) {
      const onboardingUrl = new URL('/onboarding', req.url);
      console.log(sessionClaims?.metadata?.onboardingComplete);
      
      return NextResponse.redirect(onboardingUrl);
    }

    if (!userId && !isPublicRoute(req)) {
      await auth.protect();
    }


})

export const config = {
  matcher: [
    '/api/feedback',
    '/admin',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}