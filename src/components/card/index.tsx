import clsx from "clsx";
import type { PropsWithChildren } from "react";

export default function Card({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={clsx(
                "rounded-lg border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white",
                className
            )}
        >
            {children}
        </div>
    );
}

