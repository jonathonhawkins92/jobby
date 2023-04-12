import type { MetadataRoute } from "next";
import { prisma } from "prisma/db";

async function getJobIds() {
    return prisma.job.findMany({ select: { id: true } });
}
async function getCompanyIds() {
    return prisma.company.findMany({ select: { id: true } });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [jobIds, companyIds] = await Promise.all([
        getJobIds(),
        getCompanyIds(),
    ]);
    const jobEntries = jobIds.map((job) => ({
        url: `https://jobby-seven.vercel.app/jobs/${job.id}`,
        lastModified: new Date(),
    }));
    const companyEntries = companyIds.map((company) => ({
        url: `https://jobby-seven.vercel.app/companies/${company.id}`,
        lastModified: new Date(),
    }));
    return [
        {
            url: "https://jobby-seven.vercel.app",
            lastModified: new Date(),
        },
        {
            url: "https://jobby-seven.vercel.app/jobs",
            lastModified: new Date(),
        },
        ...jobEntries,
        {
            url: "https://jobby-seven.vercel.app/companies",
            lastModified: new Date(),
        },
        ...companyEntries,
    ];
}

