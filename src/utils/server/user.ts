import type { User } from "@clerk/nextjs/dist/api";
import { currentUser } from "@clerk/nextjs/app-beta";

export function isAdminCheck(user: null | User): boolean {
    if (!user) return false;
    const { isAdmin } = user.privateMetadata;
    if (typeof isAdmin !== "boolean") return false;
    return isAdmin;
}

export async function getAdminUser(): Promise<User | null> {
    const user = await currentUser();
    if (!user) return null;
    if (!isAdminCheck(user)) return null;
    return user;
}

