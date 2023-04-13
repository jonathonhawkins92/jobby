import { prisma } from "prisma/db";

import * as Resp from "~/utils/server/response";

export const runtime = "nodejs";

async function getOverviewData() {
    const data = await prisma.job.findMany({
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

    return data
        .map((job) => {
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
                tags: job.tag.map(({ tag }) => ({
                    id: tag.id,
                    value: tag.value,
                })),
            };
        })
        .filter(Boolean);
}

export type GetOverviewData = Awaited<ReturnType<typeof getOverviewData>>;

export async function GET() {
    try {
        const data = await getOverviewData();

        return new Resp.Json(data);
    } catch (_) {
        return new Resp.ServerError();
    }
}

