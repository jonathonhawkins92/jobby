import type { PropsWithChildren } from "react";

import { ActiveLink } from "./active";
import type { LinkProps } from "./type";

export function ActiveInternalLink({
	children,
	...props
}: PropsWithChildren<LinkProps>) {
	return (
		<ActiveLink
			{...props}
			inactiveClassName="text-slate-600 dark:text-slate-400"
			activeClassName="text-purple-400 dark:text-blue-400"
		>
			{children}
		</ActiveLink>
	);
}
