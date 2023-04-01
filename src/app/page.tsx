import { prisma } from "@/../prisma/db";
import Image from "next/image";

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
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white">
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
                            <span className="rounded-md border border-slate-700 px-2 py-1">
                                {tag.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

async function getJobIds() {
    return prisma.job.findMany({
        select: {
            id: true,
        },
    });
}

export default async function Home() {
    const jobIds = await getJobIds();

    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobIds.map((j) => (
                <li key={j.id} className="grow sm:grow-0">
                    {/* @ts-expect-error Server Component */}
                    <Job id={j.id} />
                </li>
            ))}
        </ul>
    );
}

