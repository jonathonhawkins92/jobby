"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/button";

export default function JobButton({ companyId }: { companyId?: string }) {
    const router = useRouter();

    return (
        <Button
            onClick={() =>
                router.push(
                    companyId ? `/jobs?companyId=${companyId}` : "/jobs"
                )
            }
        >
            Jobs →
        </Button>
    );
}

