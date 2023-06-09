"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { DialogHTMLAttributes, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type Props = DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef<HTMLDialogElement, Props>(function Dialog(
	{ className, ...props },
	ref
) {
	return createPortal(
		<dialog
			{...props}
			ref={ref}
			className={clsx(
				"fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-900/40",
				className
			)}
		/>,
		document.body
	);
});

function stopPropagation(e: { stopPropagation: () => void }) {
	e.stopPropagation();
}

export function DialogClickBarrier({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={className}
			onMouseDown={stopPropagation}
			onTouchStart={stopPropagation}
			onClick={stopPropagation}
		>
			{children}
		</div>
	);
}
