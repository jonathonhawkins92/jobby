"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "~/components/button";

export function UserAvatar() {
    const router = useRouter();
    const { user, isSignedIn } = useUser();

    if (!isSignedIn) return null;

    if (user?.username === "jonathonhawkins92") {
        return (
            <Button variant="flatImage" shape="round" className="flex-none">
                <Image
                    src={user?.profileImageUrl || "/logo.webp"}
                    width={32}
                    height={32}
                    alt="Profile"
                    className="rounded-full"
                    onClick={() => {
                        router.push("/admin");
                    }}
                />
            </Button>
        );
    }
    return (
        <div className="rounded-full border p-0.5">
            <Image
                src={user?.profileImageUrl || "/logo.webp"}
                width={32}
                height={32}
                alt="Profile"
                className="flex-none rounded-full"
            />
        </div>
    );
}

