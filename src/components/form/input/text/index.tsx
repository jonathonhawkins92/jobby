import { clsx } from "clsx";
import type { HTMLProps } from "react";
import { forwardRef } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type">;

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
	{ className, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			className={clsx(
				"focus input-bg input-bg-interaction border-common input-text placeholder block w-full p-2.5",
				className
			)}
			type="text"
		/>
	);
});
