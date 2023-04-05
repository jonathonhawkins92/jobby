import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/app-beta";
import { CompanyCreationModal } from "./components/modal/company/create";
import type { Company } from "@prisma/client";
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

    // const companies = await getCompanies();

    // console.log(companies);

    return (
        <>
            <header className="flex flex-none justify-between border-b-[1px] border-slate-200 p-2 dark:border-slate-700">
                <h1 className="font-bold ">Companies</h1>
                {user?.username === "jonathonhawkins92" && (
                    <CompanyCreationModal />
                )}
            </header>
            <section className="grow overflow-y-auto bg-pink-500/20">
                {/* <ul>
                    {companies.map((c) => (
                        <h1 key={c.id} className="text-xl">
                            {c.name}
                        </h1>
                    ))}
                </ul> */}
            </section>
        </>
    );
}

