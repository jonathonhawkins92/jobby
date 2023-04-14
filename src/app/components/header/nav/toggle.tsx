import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { Button } from "~/components/button";
import { CrossMarkIcon } from "~/components/icons/cross-mark";
import { MenuIcon } from "~/components/icons/menu";

export function NavToggle({
    onClick,
    isToggled,
    ...props
}: { isToggled: boolean } & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) {
    return (
        <Button
            aria-label="Toggle navigation"
            variant="flatIcon"
            onClick={onClick}
            {...props}
        >
            {isToggled ? <CrossMarkIcon /> : <MenuIcon />}
        </Button>
    );
}

