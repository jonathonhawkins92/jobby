import { ActiveLink } from "../../active-link";
import type { PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

export function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
    return (
        <ActiveLink
            {...props}
            className="font-medium"
            inactiveClassName="text-slate-700 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-100"
            activeClassName="text-blue-700 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400"
        >
            {children}
        </ActiveLink>
    );
}

