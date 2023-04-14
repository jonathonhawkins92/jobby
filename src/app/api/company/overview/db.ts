import { prisma } from "prisma/db";

export async function getOverviewData() {
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
