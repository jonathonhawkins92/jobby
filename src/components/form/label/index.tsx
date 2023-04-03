import clsx from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = HTMLProps<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, Props>(function Label(
    { className, ...props },
    ref
) {
    return (
        <label
            {...props}
            ref={ref}
            className={clsx(
                "block w-full text-left text-sm font-medium text-slate-700 dark:text-slate-200",
                className
            )}
        />
    );
});

