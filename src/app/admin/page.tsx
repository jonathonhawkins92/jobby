import type { Metadata } from "next";

import { CompanyForm } from "./components/forms/company";
import Card from "~/components/card";

export const metadata: Metadata = {
    title: "Jobby - Admin",
};

export default function Admin() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center gap-6 py-32 text-center sm:py-48 lg:py-56">
            <Card className="w-full max-w-xs">
                <CompanyForm />
            </Card>
        </div>
    );
}

