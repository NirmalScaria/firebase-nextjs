import { NextResponse } from 'next/server';
import checkUser from './check-user';

const AUTH_PATHS = [
    "/login",
    "/register",
    "/forgot-password"
]

export default async function NextFireJSMiddleware({ req, middleware = undefined, nextFireJSMiddlewareOptions = {} }) {
    const path = req.nextUrl.pathname;
    const loggedIn = await checkUser();
    middleware = middleware ?? ((req) => { return NextResponse.next() });

    // If user is already logged in, and tries an auth page
    // Redirect to the target page
    if (loggedIn && AUTH_PATHS.includes(path)) {
        const target = req.nextUrl.searchParams.get('target') ?? "/";
        return NextResponse.redirect(new URL(target, req.nextUrl));
    }

    // Requesting an auth page.
    // These are special routes handled by NextFireJS auth.
    if (AUTH_PATHS.includes(path)) {
        return NextResponse.next()
    }

    // If a regex rule is defined in allowRule, allow the path if it matches
    // Every other form of rule specification is ignored.
    if (nextFireJSMiddlewareOptions.allowRule != undefined) {
        const rule = new RegExp(nextFireJSMiddlewareOptions.allowRule)
        if (rule.test(path)) {
            return middleware(req)
        }
        else {
            if (loggedIn) {
                return middleware(req)
            }
            return NextResponse.redirect(new URL('/login?target=' + path, req.nextUrl));
        }
    }

    if (nextFireJSMiddlewareOptions.gateMode == "allowByDefault") {
        // Routes will be allowed by default
        // Routes in privatePaths will be denied for unauthenticated users
        if (nextFireJSMiddlewareOptions.privatePaths.includes(path) && !loggedIn) {
            return NextResponse.redirect(new URL('/login?target=' + path, req.nextUrl));
        }
        return middleware(req)
    }
    // Routes will be denied by default
    // Routes in publicPaths will be allowed for unauthenticated users
    if (nextFireJSMiddlewareOptions.publicPaths.includes(path) || loggedIn) {
        return middleware(req)
    }
    return NextResponse.redirect(new URL('/login?target=' + path, req.nextUrl));
}

export const config = {
    matcher: '/login',
};
