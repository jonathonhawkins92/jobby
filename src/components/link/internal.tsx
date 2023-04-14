import { clsx } from "clsx";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import type { LinkProps } from "./type";

interface InternalLinkProps extends LinkProps {
	includeVisited?: boolean;
}

export function InternalLink({
	children,
	className,
	includeVisited = true,
	...props
}: PropsWithChildren<InternalLinkProps>) {
	return (
		<Link
			className={clsx(
				"text-purple-400 transition-colors hover:text-purple-500 focus:text-purple-500 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500",
				includeVisited &&
					"visited:text-purple-300 visited:hover:text-purple-500 visited:focus:text-purple-500 dark:visited:text-blue-300 dark:visited:hover:text-blue-500 dark:visited:focus:text-blue-500",
				className
			)}
			{...props}
		>
			{children}
		</Link>
	);
}
