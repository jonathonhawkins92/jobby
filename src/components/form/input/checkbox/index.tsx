import { clsx } from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
	{ className, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			className={clsx(
				"focus input-bg input-bg-interaction border-common h-4 w-4",
				className
			)}
			type="checkbox"
		/>
	);
});
