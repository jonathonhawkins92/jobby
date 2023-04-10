import type { PropsWithChildren } from "react";
import type { AnchorHTMLAttributes } from "react";
import { ExternalLinkIcon } from "~/components/icons/external-link";
import clsx from "clsx";

export function ExternalLink({
    children,
    className,
    includeVisited = true,
    ...props
}: PropsWithChildren<
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        includeVisited?: boolean;
        href: string;
    }
>) {
    return (
        <a
            {...props}
            target="_blank"
            referrerPolicy="no-referrer"
            className={clsx(
                "text-purple-400 transition-colors hover:text-purple-500 focus:text-purple-500 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500",
                includeVisited &&
                    "visited:text-purple-300 visited:hover:text-purple-500 visited:focus:text-purple-500 dark:visited:text-blue-300 dark:visited:hover:text-blue-500 dark:visited:focus:text-blue-500",
                className
            )}
        >
            {children}{" "}
        </a>
    );
}

export function InlineExternalLinkIcon() {
    return <ExternalLinkIcon className="inline-block h-4 w-4 align-text-top" />;
}

