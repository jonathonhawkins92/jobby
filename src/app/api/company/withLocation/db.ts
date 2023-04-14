import { prisma } from "prisma/db";
import { InvalidError } from "~/app/api/utils/exception";
import { getAdminUser } from "~/utils/server/user";

import { companyWithLocationSchema } from "./schema";

export async function createCompanyWithLocation(input: unknown) {
	const adminUser = await getAdminUser();

	const result = await companyWithLocationSchema.safeParseAsync(input);

	if (!result.success) {
		throw new InvalidError({
			cause: result.error,
		});
	}

	const company = await prisma.company.create({
		data: {
			ownedBy: adminUser.id,
			logoUrl: result.data.logo,
			name: result.data.name,
			description: result.data.description,
			about: result.data.about,
			industry: result.data.industry,
		},
	});

	await prisma.location.createMany({
		data: result.data.location.map((l) => ({
			name: l.name,
			address: l.address,
			city: l.city,
			country: l.country,
			companyId: company.id,
		})),
	});
	return { id: company.id };
}

export type CreateCompanyWithLocationResult = Awaited<
	ReturnType<typeof createCompanyWithLocation>
>;
