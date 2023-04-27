"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/button";

export default function JobButton({
    companyName,
    companyId,
}: {
    companyName: string;
    companyId?: string;
}) {
    const router = useRouter();

    return (
        <Button
            aria-label={
                companyName
                    ? `Navigate to the jobs page, with the page pre-filtered to show ${companyName} jobs.`
                    : "Navigate to the jobs page"
            }
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

