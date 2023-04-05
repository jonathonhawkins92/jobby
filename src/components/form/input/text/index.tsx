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
                "block w-full rounded-md  border border-slate-200 bg-white p-2.5 text-sm font-light text-black placeholder-slate-400 placeholder:font-medium  placeholder:italic dark:border-slate-700  dark:bg-slate-900/70 dark:text-white  dark:placeholder-slate-600",
                className
            )}
            type="text"
        />
    );
});

