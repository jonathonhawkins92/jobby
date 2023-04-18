"use client";

import { useClerk } from "@clerk/nextjs/app-beta/client";

export function SignInCTA() {
	const { openSignIn } = useClerk();

	return (
		<button
			onClick={() => openSignIn()}
			className="focus input-button border-common input-text rounded-md bg-purple-800 px-3 py-1 text-white shadow-sm hover:bg-purple-600 dark:bg-blue-500 dark:font-medium dark:hover:bg-blue-600"
		>
			Sign in
		</button>
	);
}
