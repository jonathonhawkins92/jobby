import { ActiveLink } from "./active-link";
import type { PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

export function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
    return (
        <ActiveLink
            {...props}
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
            activeClassName="dark:text-blue-500 text-blue-500"
        >
            {children}
        </ActiveLink>
    );
}

