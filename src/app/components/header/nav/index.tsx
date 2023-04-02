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

    let content: ReactNode = null;
    if (!isLoaded) {
        content = <span>Loading...</span>;
    } else if (isSignedIn) {
        content = <SignOutButton signOutCallback={() => router.push("/")} />;
    } else {
        content = <SignInButton />;
    }

    return (
        <button className="text-slate-600 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400">
            {content}
        </button>
    );
}

export function Nav() {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <nav
            className="flex min-h-[2rem] flex-wrap items-center justify-end gap-2 sm:flex-nowrap sm:gap-5"
            aria-label="Global"
        >
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
        </nav>
    );
}

