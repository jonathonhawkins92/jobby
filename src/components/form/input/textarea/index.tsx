import clsx from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = HTMLProps<HTMLTextAreaElement>;

export const TextareaInput = forwardRef<HTMLTextAreaElement, Props>(
    function TextareaInput({ className, ...props }, ref) {
        return (
            <textarea
                {...props}
                ref={ref}
                rows={4}
                className={clsx(
                    "block w-full rounded-md  border border-slate-200 bg-white p-2.5 text-sm font-light text-black placeholder-slate-400 placeholder:font-medium  placeholder:italic dark:border-slate-700  dark:bg-slate-900/70 dark:text-white  dark:placeholder-slate-600",
                    "min-h-[2.625rem]",
                    className
                )}
            />
        );
    }
);

