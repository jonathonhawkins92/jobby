"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Nav } from "./nav";
import { ThemeToggle } from "./theme-toggle";

function UserAvatar() {
    const { user } = useUser();

    return (
        <div className="h-8 w-8 flex-none rounded-full border bg-white p-0.5 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800">
            <Image
                src={user?.profileImageUrl || "/logo.webp"}
                width={32}
                height={32}
                alt="Profile"
                className="rounded-full"
            />
        </div>
    );
}

export function Controls() {
    return (
        <div className="flex min-h-[2rem] flex-row flex-wrap items-center justify-end gap-2 sm:flex-row-reverse sm:flex-nowrap sm:gap-5 ">
            <UserAvatar />
            <ThemeToggle />
            <Nav />
        </div>
    );
}
