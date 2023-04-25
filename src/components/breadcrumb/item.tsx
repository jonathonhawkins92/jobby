import type { PropsWithChildren } from "react";

import { ChevronRight } from "~/components/icons/chevron-right";

export function BreadcrumbItem({
	children,
	isCurrent = false,
}: PropsWithChildren<{ isCurrent?: boolean }>) {
	return (
		<li aria-current={isCurrent ? "page" : undefined}>
			<div className="flex items-center gap-1">
				<h1>{children}</h1>
				{!isCurrent && <ChevronRight />}
			</div>
		</li>
	);
}
