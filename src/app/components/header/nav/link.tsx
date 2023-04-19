import type { PropsWithChildren } from "react";

import { ActiveInternalLink } from "~/components/link/active-internal";
import type { LinkProps } from "~/components/link/type";

export function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
	return (
		<ActiveInternalLink
			{...props}
			className="focus link-text-color-interaction flex rounded-md p-1"
		>
			{children}
		</ActiveInternalLink>
	);
}
