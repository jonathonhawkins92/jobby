import type { Metadata } from "next";

import { CompanyForm } from "./components/forms/company";

export const metadata: Metadata = {
    title: "Jobby - Admin",
};

export default function Admin() {
    return (
        <div className="mx-auto">
            <CompanyForm />
        </div>
    );
}

