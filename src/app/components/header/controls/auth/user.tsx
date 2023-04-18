"use client";

import { UserButton } from "@clerk/nextjs/app-beta/client";

export function User() {
	return (
		<UserButton
			afterSignOutUrl="/"
			appearance={{
				layout: {
					logoPlacement: "none",
				},
				elements: {
					userButtonAvatarImage:
						"focus border-none rounded-full p-0.5",
					userButtonAvatarBox:
						"h-[30px] w-[30px] input-button input-bg-interaction input-bg border-common-color rounded-full focus",
				},
			}}
		/>
	);
}
