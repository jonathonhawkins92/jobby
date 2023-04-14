import { clsx } from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type">;

export const Radio = forwardRef<HTMLInputElement, Props>(function Radio(
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
			type="radio"
		/>
	);
});
