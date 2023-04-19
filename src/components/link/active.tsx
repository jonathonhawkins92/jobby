"use client";

import { clsx } from "clsx";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useMemo } from "react";

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

	const isActive = useMemo(() => {
		if (typeof props.href !== "string") return false;
		return pathname.split("/")[1] === props.href.split("/")[1];
	}, [pathname, props.href]);

	return (
		<Link
			{...props}
			className={clsx(
				className,
				isActive ? activeClassName : inactiveClassName
			)}
		>
			{children}
		</Link>
	);
}
