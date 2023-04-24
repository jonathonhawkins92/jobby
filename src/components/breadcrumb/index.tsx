import type { PropsWithChildren } from "react";

export function Breadcrumb({ children }: PropsWithChildren) {
	return (
		<ol
			aria-label="Breadcrumb"
			className="inline-flex items-center gap-1 text-sm font-medium"
		>
			{children}
		</ol>
	);
}
