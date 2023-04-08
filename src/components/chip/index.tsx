import { CrossMarkIcon } from "~/components/icons/crossMark";
import { EditIcon } from "~/components/icons/edit";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

export function ChipButton({
    children,
    onClick,
    isDisabled = false,
}: PropsWithChildren<{
    onClick: () => void;
    isDisabled?: boolean;
}>) {
    return (
        <button
            className="focus input-button input-text input-bg input-bg-interaction rounded-[5px] p-1"
            onClick={() => onClick()}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}

export function Chip({
    children,
    onRemove,
    onEdit,
    isDisabled = false,
    className,
}: PropsWithChildren<{
    onRemove?: () => void;
    onEdit?: () => void;
    isDisabled?: boolean;
    className?: string;
}>) {
    return (
        <div className={className}>
            <div className="border-common input-bg input-text flex items-center gap-0.5 p-0.5 align-middle">
                {onEdit && (
                    <ChipButton
                        onClick={() => onEdit()}
                        isDisabled={isDisabled}
                    >
                        <EditIcon />
                    </ChipButton>
                )}
                <span
                    className={clsx(
                        "border-common-color input-text  px-2",
                        isDisabled && "input-text-disabled",
                        onEdit && "border-l-[1px]",
                        onRemove && "border-r-[1px]"
                    )}
                >
                    {children}
                </span>
                {onRemove && (
                    <ChipButton
                        onClick={() => onRemove()}
                        isDisabled={isDisabled}
                    >
                        <CrossMarkIcon />
                    </ChipButton>
                )}
            </div>
        </div>
    );
}

