import { prisma } from "prisma/db";

import * as Resp from "~/utils/server/response";

export const runtime = "nodejs";

async function getIdData() {
    const data = await prisma.company.findMany({
        select: { id: true },
    });
    return data;
}

export type GetIdData = Awaited<ReturnType<typeof getIdData>>;

export async function GET() {
    try {
        const data = await getIdData();
        return new Resp.Json(data);
    } catch (_) {
        return new Resp.ServerError();
    }
}

