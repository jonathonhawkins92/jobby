import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jobby - Admin",
};

export default function Admin() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center gap-6 py-32 text-center sm:py-48 lg:py-56">
            Ad man
        </div>
    );
}

