import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Modal as CompanyAndLocationModal } from "./components/modal/companyAndLocation";
import { Modal as CompanyModal } from "./components/modal/company";
import { prisma } from "prisma/db";
import { EditIcon } from "~/components/icons/edit";
import Image from "next/image";
import { AddIcon } from "~/components/icons/add";
import { Card } from "~/components/card";
import { Chip } from "~/components/chip";
import { Button } from "~/components/button";
import JobButton from "./components/job-button";
import clsx from "clsx";

export const metadata: Metadata = {
    title: "Jobby - Companies",
};

async function getCompanies() {
    const data = await prisma.company.findMany({
        select: {
            id: true,
            name: true,
            logoUrl: true,
            description: true,
            about: true,
            industry: true,
            location: {
                select: {
                    address: true,
                },
            },
        },
    });

    return data;
}

const isFav = false;

export default async function Companies() {
    const user = await currentUser();

    const companies = await getCompanies();

    const { isAdmin } = user?.privateMetadata as { isAdmin: boolean };

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
            <section className="grow overflow-y-auto p-4">
                <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {companies.map((c) => (
                        <li key={c.id}>
                            <Card
                                className={clsx(
                                    isFav &&
                                        "border-purple-500 dark:border-blue-400"
                                )}
                            >
                                <header
                                    className={clsx(
                                        "flex items-start justify-between gap-2 border-b-[1px] border-slate-300 px-2 pb-4 dark:border-slate-700",
                                        isFav &&
                                            "border-purple-500 dark:border-blue-400"
                                    )}
                                >
                                    <div className="flex flex-1 gap-2">
                                        {c.logoUrl && (
                                            <div className="border-common-color flex h-12 w-12 flex-none shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1px] bg-slate-50/40 p-1.5 transition-colors dark:bg-slate-800/40">
                                                <Image
                                                    className="rounded-sm"
                                                    width={34}
                                                    height={34}
                                                    src={c.logoUrl}
                                                    alt={`${c.name} logo`}
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h1
                                                className={clsx(
                                                    "border-common-color inline flex-none border-b-[1px] pb-0.5 text-xl font-medium",
                                                    isFav &&
                                                        "border-purple-500 dark:border-blue-400"
                                                )}
                                            >
                                                {c.name}
                                            </h1>
                                            {c.location[0]?.address && (
                                                <h3 className="pt-0.5 text-sm">
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${c.name}+${c.location[0]?.address}`}
                                                        target="_blank"
                                                        referrerPolicy="no-referrer"
                                                        className="text-purple-600 visited:text-purple-700 hover:text-purple-500 focus:text-purple-500 dark:text-blue-400 visited:dark:text-blue-500 dark:hover:text-blue-300 dark:focus:text-blue-300"
                                                    >
                                                        {c.location[0]?.address}{" "}
                                                        <svg
                                                            className="inline-block h-4 w-4 align-text-top"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth={1.5}
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                                            />
                                                        </svg>
                                                    </a>
                                                </h3>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex max-w-[6.75rem] flex-auto grow-0 flex-wrap justify-end gap-2 ">
                                        <JobButton companyId={c.id} />
                                        {isAdmin && (
                                            <CompanyModal
                                                name={c.name}
                                                logo={c.logoUrl || ""}
                                                description={
                                                    c.description || ""
                                                }
                                                about={c.about || ""}
                                                industry={c.industry || ""}
                                                id={c.id}
                                            >
                                                <EditIcon />
                                            </CompanyModal>
                                        )}
                                        <Button
                                            variant="flatIcon"
                                            className={clsx(
                                                isFav &&
                                                    "text-purple-500 dark:text-blue-400"
                                            )}
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill={
                                                        isFav
                                                            ? "currentColor"
                                                            : undefined
                                                    }
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                                />
                                            </svg>
                                        </Button>
                                    </div>
                                </header>
                                <article className="flex flex-col gap-2 px-2 pt-4 ">
                                    <p>{c.description}</p>
                                    <div>
                                        <Chip className="inline-block">
                                            {c.industry}
                                        </Chip>
                                    </div>
                                </article>
                            </Card>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

