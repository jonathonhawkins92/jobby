import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";

import { UnauthorizedError, NonAdminError } from "~/app/api/utils/exception";

export function isAdminCheck(user: null | User): boolean {
	if (!user) return false;
	const { isAdmin } = user.privateMetadata;
	if (typeof isAdmin !== "boolean") return false;
	return isAdmin;
}

export const safeGetUser = currentUser;

export async function getUser() {
	const user = await currentUser();
	if (!user) throw new UnauthorizedError();
	return user;
}

export async function safeGetAdminUser(): Promise<User | null> {
	const user = await getUser();
	if (!isAdminCheck(user)) null;
	return user;
}

export async function getAdminUser(): Promise<User> {
	const user = await safeGetAdminUser();
	if (!user) throw new NonAdminError();
	return user;
}
