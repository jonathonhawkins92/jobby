import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Modal as CompanyAndLocationModal } from "./components/modal/companyAndLocation";
import { Modal as CompanyModal } from "./components/modal/company";
import { prisma } from "prisma/db";
import { EditIcon } from "~/components/icons/edit";
import Link from "next/link";
import { AddIcon } from "~/components/icons/add";

export const metadata: Metadata = {
    title: "Jobby - Companies",
};

async function getCompanies() {
    const companies = await prisma.company.findMany({
        select: {
            id: true,
            name: true,
            logoUrl: true,
            description: true,
            about: true,
            industry: true,
        },
    });

    return companies;
}

export default async function Companies() {
    const user = await currentUser();

    const companies = await getCompanies();

    const isAdmin = user?.username === "jonathonhawkins92";

    return (
        <>
            <header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4 dark:border-slate-700">
                <h1>Companies</h1>
                {isAdmin && (
                    <CompanyAndLocationModal>
                        <AddIcon />
                    </CompanyAndLocationModal>
                )}
            </header>
            <section className="grow overflow-y-auto">
                <ul className="px-2 py-4">
                    {companies.map((c) => (
                        <li
                            key={c.id}
                            className="flex items-center gap-2 border-b-[1px] border-slate-300 px-2 py-4 last:border-b-0 dark:border-slate-700"
                        >
                            <Link
                                href={`/companies/${c.id}`}
                                className="focus grow rounded-md"
                            >
                                <h1 className="text-start text-xl">{c.name}</h1>
                            </Link>
                            {isAdmin && (
                                <div className="no-flex">
                                    <CompanyModal
                                        name={c.name}
                                        logo={c.logoUrl || ""}
                                        description={c.description || ""}
                                        about={c.about || ""}
                                        industry={c.industry || ""}
                                        id={c.id}
                                    >
                                        <EditIcon />
                                    </CompanyModal>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

