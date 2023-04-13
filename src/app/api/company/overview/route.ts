import { prisma } from "prisma/db";

import * as Resp from "~/utils/server/response";

export const runtime = "nodejs";

async function getOverviewData() {
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
                    city: true,
                    country: true,
                },
            },
        },
    });
    return data;
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

