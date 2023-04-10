import { ActiveInternalLink } from "~/components/link/active-internal";
import type { LinkProps } from "~/components/link/type";
import type { PropsWithChildren } from "react";

export function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
    return (
        <ActiveInternalLink {...props} className="focus flex rounded-md p-1">
            {children}
        </ActiveInternalLink>
    );
}

