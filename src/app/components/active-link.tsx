"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import type { LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import clsx from "clsx";

type ActiveLinkProps = LinkProps & {
    className?: string;
    inactiveClassName?: string;
    activeClassName: string;
};

export function ActiveLink({
    children,
    inactiveClassName,
    activeClassName,
    className,
    ...props
}: PropsWithChildren<ActiveLinkProps>) {
    const pathname = usePathname();

    return (
        <Link
            {...props}
            className={clsx(
                className,
                pathname === props.href ? activeClassName : inactiveClassName
            )}
        >
            {children}
        </Link>
    );
}

