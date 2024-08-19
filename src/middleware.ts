import { NextResponse } from 'next/server';

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, request) => {
	if (request.nextUrl.pathname !== '/') {
		return NextResponse.redirect(new URL('/', request.url));
	}
});

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
