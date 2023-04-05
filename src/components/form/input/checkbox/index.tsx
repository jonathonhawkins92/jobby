import clsx from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
    { className, ...props },
    ref
) {
    return (
        <input
            {...props}
            ref={ref}
            className={clsx(
                "h-4 w-4 rounded-md border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500  focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:ring-offset-slate-800 dark:focus:border-blue-500 ",
                className
            )}
            type="checkbox"
        />
    );
});

