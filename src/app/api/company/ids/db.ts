import { prisma } from "prisma/db";

export async function getIdsData() {
	const data = await prisma.company.findMany({
		select: { id: true },
	});
	return data;
}

export type GetIdsData = Awaited<ReturnType<typeof getIdsData>>;
