"use client";
import { SignInButton, useUser } from "@clerk/nextjs";

export function SignInPrompt() {
    const { isSignedIn } = useUser();

    if (isSignedIn) return null;

    return (
        <SignInButton>
            <button className="focus input-button border-common input-text rounded-md bg-blue-600 px-3 py-1 text-white shadow-sm hover:bg-blue-500">
                Sign in
            </button>
        </SignInButton>
    );
}

