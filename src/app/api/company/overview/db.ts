import { prisma } from "prisma/db";

export class OverviewDatabase {
	public async get() {
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
}
export type Get = Awaited<ReturnType<OverviewDatabase["get"]>>;
