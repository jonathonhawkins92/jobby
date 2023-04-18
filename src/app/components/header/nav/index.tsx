import type { PropsWithChildren } from "react";

import { NavLink } from "./link";

function Item({ children }: PropsWithChildren) {
	return <li className="flex justify-end p-1 font-medium">{children}</li>;
}

export function Nav() {
	return (
		<ol className="mt-0 flex flex-col justify-end gap-5 sm:flex-row sm:items-center">
			<Item>
				<NavLink href="/">Home</NavLink>
			</Item>
			<Item>
				<NavLink href="/jobs">Jobs</NavLink>
			</Item>
			<Item>
				<NavLink href="/companies">Companies</NavLink>
			</Item>
		</ol>
	);
}
