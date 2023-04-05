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
                    "focus input-bg input-bg-interaction border-common input-text placeholder block min-h-[2.625rem] w-full p-2.5",
                    className
                )}
            />
        );
    }
);

