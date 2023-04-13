import { prisma } from "prisma/db";

export async function getIdData() {
    const data = await prisma.company.findMany({
        select: { id: true },
    });
    return data;
}

export type GetIdData = Awaited<ReturnType<typeof getIdData>>;

