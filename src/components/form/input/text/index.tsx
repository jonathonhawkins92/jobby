import clsx from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type">;

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
    { className, ...props },
    ref
) {
    return (
        <input
            {...props}
            ref={ref}
            className={clsx(
                "block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                className
            )}
            type="text"
        />
    );
});

