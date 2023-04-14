import { prisma } from "prisma/db";
import { InvalidError } from "~/app/api/utils/exception";
import { getAdminUser } from "~/utils/server/user";

import { ByIdDatabase } from "./[id]/db";
import { IdsDatabase } from "./ids/db";
import { OverviewDatabase } from "./overview/db";
import { companySchema } from "./schema";
import { WithLocationDatabase } from "./withLocation/db";

class CompanyDatabase {
	static instance: CompanyDatabase = new CompanyDatabase();
	public byId(value: string) {
		return new ByIdDatabase(value);
	}
	public ids = new IdsDatabase();
	public overview = new OverviewDatabase();
	public withLocation = new WithLocationDatabase();

	public async post(input: unknown) {
		const user = await getAdminUser();

		const result = await companySchema.safeParseAsync(input);
		if (!result.success) {
			throw new InvalidError({
				cause: result.error,
			});
		}

		const company = await prisma.company.create({
			data: {
				ownedBy: user.id,
				logoUrl: result.data.logo,
				name: result.data.name,
				description: result.data.description,
				about: result.data.about,
				industry: result.data.industry,
			},
		});

		return { id: company.id };
	}
}
export type Post = Awaited<ReturnType<CompanyDatabase["post"]>>;

export default CompanyDatabase.instance;
