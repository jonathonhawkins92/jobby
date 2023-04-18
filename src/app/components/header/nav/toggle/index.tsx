"use client";

import { clsx } from "clsx";
import { useState } from "react";
import type { PropsWithChildren } from "react";

import { NavToggleButton } from "./button";

export function NavToggle({ children }: PropsWithChildren) {
	const [isToggled, setIsToggled] = useState(false);

	return (
		<>
			<div className="sm:hidden">
				<NavToggleButton
					isToggled={isToggled}
					onClick={() => setIsToggled((t) => !t)}
				/>
			</div>
			<div
				className={clsx(
					"grow basis-full sm:block",
					isToggled ? "" : "hidden"
				)}
			>
				{children}
			</div>
		</>
	);
}
