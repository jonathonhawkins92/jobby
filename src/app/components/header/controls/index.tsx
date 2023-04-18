import { cookies } from "next/headers";

import { Auth } from "./auth";
import { ThemeToggle } from "./theme-toggle";

export function Controls() {
	const cookieStore = cookies();
	const theme = cookieStore.get("theme");

	return (
		<>
			<Auth />
			<ThemeToggle initialTheme={theme?.value} />
		</>
	);
}
