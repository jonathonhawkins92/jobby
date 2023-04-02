import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export function Header({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
    return (
        <header
            className={clsx(
                "top-0 z-50 border-b border-slate-200 bg-white/10 p-4 text-sm dark:border-slate-700 dark:bg-gray-900/10 ",
                className
            )}
        >
            <div className="container mx-auto flex w-full flex-wrap items-start justify-between">
                <Link
                    href="/"
                    className=" flex flex-none items-center justify-end gap-1 text-xl font-semibold text-slate-800 dark:text-white"
                >
                    <Image
                        src="/logo.webp"
                        height={32}
                        width={32}
                        alt="The Jobby Logo - a poop emoji"
                    />
                    Jobby
                </Link>
                {children}
            </div>
        </header>
    );
}

