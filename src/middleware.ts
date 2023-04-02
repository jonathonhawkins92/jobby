import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/sign-in*", "/sign-up*", "/jobs", "/companies"];

const isPublic = (path: string) => {
    return publicPaths.find((x) =>
        path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
    );
};

export default withClerkMiddleware((request: NextRequest) => {
    if (isPublic(request.nextUrl.pathname)) {
        return NextResponse.next();
    }
    // if the user is not signed in redirect them to the home in page.
    const { userId } = getAuth(request);

    if (!userId) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next
         * - static (static files)
         * - favicon.ico (favicon file)
         * - public folder
         * - public folder
         */
        "/((?!static|.*\\..*|_next|favicon.ico).*)",
        "/",
    ],
};

