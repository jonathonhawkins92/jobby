import { ActiveLink } from "../../active-link";
import type { PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

export function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
    return (
        <ActiveLink
            {...props}
            className="focus flex rounded-md p-1"
            inactiveClassName="text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"
            activeClassName="text-purple-600 hover:text-purple-500 focus:text-purple-500 dark:text-blue-400 dark:hover:text-blue-300 dark:focus:text-blue-300"
        >
            {children}
        </ActiveLink>
    );
}

