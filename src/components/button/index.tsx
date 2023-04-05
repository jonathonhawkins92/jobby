import clsx from "clsx";
import type { HTMLProps } from "react";

const variants = {
    flat: `px-3 py-1`,
    flatIcon: `p-1.5`,
    flatImage: `p-0.5`,
} as const;

const shapes = {
    square: `rounded-md`,
    round: `rounded-full`,
} as const;

export function Button({
    variant = "flat",
    shape = "square",
    className,
    ...props
}: Omit<HTMLProps<HTMLButtonElement>, "type"> & {
    variant?: keyof typeof variants;
    shape?: keyof typeof shapes;
}) {
    return (
        <button
            {...props}
            type="button"
            className={clsx(
                "focus input-button input-text input-bg input-bg-interaction border-common",
                variants[variant],
                shapes[shape],
                className
            )}
        />
    );
}

