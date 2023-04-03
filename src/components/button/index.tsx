import clsx from "clsx";
import type { ButtonHTMLAttributes, HTMLProps } from "react";

const flat =
    "border bg-white align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800";

const variants = {
    flat: `${flat} px-3 py-1`,
    flatIcon: `${flat} p-1.5`,
    flatImage: `${flat} p-0.5`,
} as const;

const shapes = {
    square: `rounded-md`,
    round: `rounded-full`,
} as const;

export function Button({
    type = "button",
    variant = "flat",
    shape = "square",
    className,
    ...props
}: HTMLProps<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    shape?: keyof typeof shapes;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) {
    return (
        <button
            {...props}
            type={type}
            className={clsx(variants[variant], shapes[shape], className)}
        />
    );
}

