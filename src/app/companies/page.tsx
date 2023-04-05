import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Modal as CompanyAndLocationModal } from "./components/modal/companyAndLocation";
import { prisma } from "prisma/db";

export const metadata: Metadata = {
    title: "Jobby - Companies",
};

async function getCompanies() {
    const companies = await prisma.company.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return companies;
}

export default async function Companies() {
    const user = await currentUser();

    const companies = await getCompanies();

    console.log(companies);

    return (
        <>
            <header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4  dark:border-slate-700">
                <h1>Companies</h1>
                {user?.username === "jonathonhawkins92" && (
                    <CompanyAndLocationModal />
                )}
            </header>
            <section className="grow overflow-y-auto ">
                <ul>
                    {companies.map((c) => (
                        <h1 key={c.id} className="text-xl">
                            {c.name}
                        </h1>
                    ))}
                </ul>
            </section>
        </>
    );
}

