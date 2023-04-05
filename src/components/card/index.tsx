import clsx from "clsx";
import type { PropsWithChildren, HTMLAttributes } from "react";

export function Card({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { className?: string }>) {
    return (
        <div
            className={clsx(
                "rounded-md border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

