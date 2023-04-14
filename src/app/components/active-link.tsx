"use client";

import { clsx } from "clsx";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { InternalLink } from "~/components/link/internal";

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
		<InternalLink
			{...props}
			className={clsx(
				className,
				pathname === props.href ? activeClassName : inactiveClassName
			)}
		>
			{children}
		</InternalLink>
	);
}
