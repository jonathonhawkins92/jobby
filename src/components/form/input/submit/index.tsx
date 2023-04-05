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

export function Submit({
    variant = "flat",
    shape = "square",
    className,
    ...props
}: Omit<HTMLProps<HTMLInputElement>, "type"> & {
    variant?: keyof typeof variants;
    shape?: keyof typeof shapes;
}) {
    return (
        <input
            {...props}
            type="submit"
            className={clsx(
                "focus input-bg input-bg-interaction input-text border-common input-button",
                variants[variant],
                shapes[shape],
                className
            )}
        />
    );
}

