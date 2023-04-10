import type { LinkProps as NextLinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

export type LinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof NextLinkProps
> &
    NextLinkProps;

