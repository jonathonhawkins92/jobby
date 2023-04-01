"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import type { LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import clsx from "clsx";

type ActiveLinkProps = LinkProps & {
    className?: string;
    activeClassName: string;
};

export function ActiveLink({
    children,
    activeClassName,
    className,
    ...props
}: PropsWithChildren<ActiveLinkProps>) {
    const pathname = usePathname();

    return (
        <Link
            className={clsx(
                className,
                pathname === props.href && activeClassName
            )}
            {...props}
        >
            {children}
        </Link>
    );
}

