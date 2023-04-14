import type { Metadata } from "next";
import Image from "next/image";

import { getOverviewData } from "~/app/api/job/overview/db";

export const metadata: Metadata = {
    title: "Jobby - Jobs",
};

function Card({
    logo,
    company,
    title,
    salary,
    tags,
}: {
    logo: null | string;
    company: string;
    title: string;
    salary: string;
    tags: { id: string; value: string }[];
}) {
    return (
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <header className="flex gap-4">
                {logo && (
                    <Image
                        src={logo}
                        width={48}
                        height={48}
                        alt={`${company} Logo`}
                    />
                )}
                <div>
                    <h1>{company}</h1>
                    <h2>
                        {title} · {salary}
                    </h2>
                </div>
                <div></div>
            </header>
            <section className="grow pt-4">
                <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <li
                            key={tag.id}
                            className="rounded-md border border-slate-700 px-2 py-1"
                        >
                            {tag.value}
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default async function Jobs() {
    const jobs = await getOverviewData();
    return (
        <>
            <header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4 dark:border-slate-700">
                <h1>Jobs</h1>
            </header>
            <section className="grow basis-0 overflow-y-auto p-4">
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((j) => (
                        <li key={j.id} className="grow sm:grow-0">
                            <Card
                                logo={j.logo}
                                company={j.company}
                                title={j.title}
                                salary={j.salary}
                                tags={j.tags}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

