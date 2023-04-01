import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { prisma } from "@/../prisma/db";

async function getJobs() {
    return prisma.job.findMany();
}

export default async function Home() {
    const jobs = await getJobs();

    return (
        <main>
            <h1 className={inter.className}>💩 💩 💩</h1>
            <section>
                <ul>
                    {jobs.map((j) => (
                        <li key={j.id}>
                            <pre>{JSON.stringify(j, null, 4)}</pre>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

