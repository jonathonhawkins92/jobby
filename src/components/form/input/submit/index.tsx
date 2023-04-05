import clsx from "clsx";
import type { HTMLProps } from "react";

const flat =
    "border bg-white cursor-pointer align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white dark:focus:ring-offset-slate-800";

const variants = {
    flat: `${flat} px-3 py-1`,
    flatIcon: `${flat} p-1.5`,
    flatImage: `${flat} p-0.5`,
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
            className={clsx(variants[variant], shapes[shape], className)}
        />
    );
}

