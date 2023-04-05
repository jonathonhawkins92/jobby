import { prisma } from "@/../prisma/db";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jobby - Jobs",
};

async function getJobs() {
    const jobs = await prisma.job.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            salaryAmount: true,
            salaryCurrencyCode: true,
            company: {
                select: {
                    logoUrl: true,
                    name: true,
                },
            },
            tag: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            value: true,
                        },
                    },
                },
            },
        },
    });

    const result = jobs.map((job) => {
        const salary = new Intl.NumberFormat("en", {
            style: "currency",
            currency: job.salaryCurrencyCode,
        }).format(job.salaryAmount);

        return {
            id: job.id,
            title: job.title,
            description: job.description,
            salary,
            logo: job.company.logoUrl,
            company: job.company.name,
            tags: job.tag.map(({ tag }) => ({ id: tag.id, value: tag.value })),
        };
    });

    return result.filter(Boolean);
}

function Job({
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
    const jobs = await getJobs();

    return (
        <div className="p-4">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                    ...jobs,
                ].map((j) => (
                    <li key={j.id} className="grow sm:grow-0">
                        <Job
                            logo={j.logo}
                            company={j.company}
                            title={j.title}
                            salary={j.salary}
                            tags={j.tags}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

