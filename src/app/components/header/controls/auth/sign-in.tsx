"use client";

import { useClerk } from "@clerk/nextjs/app-beta/client";

export const SignInButton = () => {
    const { openSignIn } = useClerk();

    return (
        <button
            onClick={() => openSignIn()}
            className="focus min-w-[3.5rem] rounded-md p-1 font-medium text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"
        >
            Sign In
        </button>
    );
};

