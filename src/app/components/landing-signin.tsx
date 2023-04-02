"use client";
import { SignInButton, useUser } from "@clerk/nextjs";

export function SignInPrompt() {
    const { isSignedIn } = useUser();

    if (isSignedIn) return null;

    return (
        <SignInButton>
            <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
            </button>
        </SignInButton>
    );
}

