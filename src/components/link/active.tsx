"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import type { LinkProps } from "next/link";
import type { PropsWithChildren } from "react";

type Props = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps
> &
    LinkProps & {
        inactiveClassName?: string;
        activeClassName: string;
    };

export function ActiveLink({
    children,
    inactiveClassName,
    activeClassName,
    className,
    ...props
}: PropsWithChildren<Props>) {
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

