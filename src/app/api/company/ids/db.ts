import { prisma } from "prisma/db";

export class IdsDatabase {
	public async get() {
		const data = await prisma.company.findMany({
			select: { id: true },
		});
		return data;
	}
}
export type Get = Awaited<ReturnType<IdsDatabase["get"]>>;
