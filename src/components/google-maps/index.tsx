import type { PropsWithChildren } from "react";

import {
    ExternalLink,
    InlineExternalLinkIcon,
} from "~/components/link/external";

export function GoogleMaps({
    children,
    query,
}: PropsWithChildren<{ query: string }>) {
    return (
        <ExternalLink
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        >
            {children} <InlineExternalLinkIcon />
        </ExternalLink>
    );
}

