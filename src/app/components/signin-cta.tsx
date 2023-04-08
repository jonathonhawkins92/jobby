"use client";

import { useClerk } from "@clerk/nextjs/app-beta/client";

export function SignInCTA() {
    const { openSignIn } = useClerk();

    return (
        <button
            onClick={() => openSignIn()}
            className="focus input-button border-common input-text rounded-md bg-blue-600 px-3 py-1 text-white shadow-sm hover:bg-blue-500"
        >
            Sign in
        </button>
    );
}

