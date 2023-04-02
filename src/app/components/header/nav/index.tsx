"use client";
import { useRouter } from "next/navigation";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import { NavLink } from "./link";
import { NavToggle } from "./toggle";
import clsx from "clsx";

function NavListItem({ children }: PropsWithChildren) {
    return <li className="flex justify-end">{children}</li>;
}

function AuthButton() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return (
            <button className="text-slate-600 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400">
                <span>Loading…</span>
            </button>
        );
    } else if (isSignedIn) {
        return (
            <SignOutButton signOutCallback={() => router.push("/")}>
                <button className="text-slate-600 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400">
                    Sign out
                </button>
            </SignOutButton>
        );
    } else {
        return (
            <SignInButton>
                <button className="text-slate-600 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400">
                    Sign in
                </button>
            </SignInButton>
        );
    }
}

export function Nav() {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <>
            <div className="sm:hidden">
                <NavToggle
                    isToggled={isToggled}
                    onClick={() => setIsToggled((t) => !t)}
                />
            </div>
            <div
                className={clsx(
                    "grow basis-full overflow-hidden sm:block",
                    isToggled ? "" : "hidden"
                )}
            >
                <ol className="mt-0 flex flex-col justify-end gap-5 sm:flex-row sm:items-center">
                    <NavListItem>
                        <NavLink href="/">Home</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/jobs">Jobs</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/companies">Companies</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <AuthButton />
                    </NavListItem>
                </ol>
            </div>
        </>
    );
}

