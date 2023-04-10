import { ActiveLink } from "./active";
import type { LinkProps } from "./type";
import type { PropsWithChildren } from "react";

export function ActiveInternalLink({
    children,
    ...props
}: PropsWithChildren<LinkProps>) {
    return (
        <ActiveLink
            {...props}
            inactiveClassName="text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"
            activeClassName="text-purple-400 transition-colors hover:text-purple-500 focus:text-purple-500 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500"
        >
            {children}
        </ActiveLink>
    );
}

