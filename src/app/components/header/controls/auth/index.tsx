"use client"

import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";

import { SignInButton } from "./sign-in";
import { User } from "./user";

export function Auth() {
	return (
		<div className="flex w-14 justify-end">
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<User />
			</SignedIn>
		</div>
	);
}
