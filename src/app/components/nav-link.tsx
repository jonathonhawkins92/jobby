import { ActiveLink } from "./active-link";
import type { PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

export function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
    return (
        <ActiveLink
            {...props}
            className="font-medium"
            inactiveClassName="text-slate-600 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            activeClassName="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
        >
            {children}
        </ActiveLink>
    );
}

