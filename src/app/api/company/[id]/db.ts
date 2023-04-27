import { prisma } from "prisma/db";

import { InvalidError } from "~/app/api/utils/exception";
import { getAdminUser } from "~/utils/server/user";

import { companySchema } from "../schema";

export class ByIdDatabase {
	constructor(private id: string) {}

	public async get() {
		const data = await prisma.company.findFirst({
			where: {
				id: this.id,
			},
		});
		return data;
	}

	public async put(input: unknown) {
		const user = await getAdminUser();

		const result = await companySchema.safeParseAsync(input);

		if (!result.success) {
			throw new InvalidError({
				cause: result.error,
			});
		}

		await prisma.company.update({
			data: {
				ownedBy: user.id,
				logoUrl: result.data.logo,
				name: result.data.name,
				description: result.data.description,
				about: result.data.about,
				industry: result.data.industry,
			},
			where: {
				id: this.id,
			},
		});

		return { id: this.id };
	}
}
export type Get = Awaited<ReturnType<ByIdDatabase["get"]>>;
export type Put = Awaited<ReturnType<ByIdDatabase["put"]>>;
