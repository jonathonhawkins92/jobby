import Link from "next/link";
import type { PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
    return (
        <header className="flex w-full flex-wrap items-start justify-between bg-white p-4 px-8 text-sm dark:bg-gray-800 sm:px-20">
            <Link
                href="/"
                className=" flex-none text-xl font-semibold text-gray-800 dark:text-white"
            >
                💩 Jobby
            </Link>
            {children}
        </header>
    );
}

