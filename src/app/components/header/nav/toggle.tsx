import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Button from "~/components/button";

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
            <svg
                className="h-4 w-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                {isToggled ? (
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                ) : (
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                )}
            </svg>
        </Button>
    );
}

