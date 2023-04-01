/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { prisma } from "@/../prisma/db";
import Image from "next/image";

async function getJobIds() {
    return prisma.job.findMany({
        select: {
            id: true,
        },
    });
}
async function getJobById(id: string) {
    const job = await prisma.job.findUnique({
        where: {
            id,
        },
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

    if (!job) return null;

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
}

async function Job({ id }: { id: string }) {
    const job = await getJobById(id);
    if (!job) return null;

    return (
        <article className="rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:p-8">
            <header className="flex gap-4">
                <div>
                    {job.logo && (
                        <Image
                            src={job.logo}
                            width={48}
                            height={48}
                            alt={`${job.company} Logo`}
                        />
                    )}
                </div>
                <div>
                    <h1>{job.company}</h1>
                    <h2>
                        {job.title} · {job.salary}
                    </h2>
                </div>
                <div></div>
            </header>
            <section className="pt-4">
                <ul className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <li key={tag.id}>
                            <span className="border-grey-700 rounded-md border px-2 py-1">
                                {tag.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default async function Home() {
    const jobIds = await getJobIds();

    return (
        <main className={inter.className}>
            <section>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {jobIds.map((j) => (
                        <li key={j.id}>
                            {/* @ts-expect-error Server Component */}
                            <Job id={j.id} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

