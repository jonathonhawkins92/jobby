import { clsx } from "clsx";
import type { PropsWithChildren, HTMLAttributes } from "react";

export function Card({
	children,
	className,
	...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { className?: string }>) {
	return (
		<div
			className={clsx(
				"rounded-md border border-slate-200 bg-white/40 p-4 transition dark:border-slate-700 dark:bg-slate-900/40 dark:text-white",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
