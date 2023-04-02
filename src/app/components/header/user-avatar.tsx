"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export function UserAvatar() {
    const router = useRouter();
    const { user, isSignedIn } = useUser();

    if (!isSignedIn) return null;

    return (
        <div className="h-8 w-8 flex-none rounded-full border bg-white p-0.5 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800">
            <Image
                src={user?.profileImageUrl || "/logo.webp"}
                width={32}
                height={32}
                alt="Profile"
                className="rounded-full"
                onClick={
                    user?.username === "jonathonhawkins92"
                        ? () => {
                              router.push("/admin");
                          }
                        : undefined
                }
            />
        </div>
    );
}

