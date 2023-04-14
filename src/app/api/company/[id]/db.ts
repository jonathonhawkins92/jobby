import { prisma } from "prisma/db";
import * as Resp from "~/app/api/utils/response";
import { getAdminUser } from "~/utils/server/user";

import { companySchema } from "../schema";

export const runtime = "nodejs";

export async function getCompanyByIdData(id: string) {
	const data = await prisma.company.findFirst({
		where: {
			id,
		},
	});
	return data;
}

export type GetCompanyByIdData = Awaited<ReturnType<typeof getCompanyByIdData>>;

export async function putCompanyByIdData(companyId: string, input: unknown) {
	const user = await getAdminUser();
	if (!user) {
		throw new Resp.Unauthorized();
	}

	const result = await companySchema.safeParseAsync(input);

	if (!result.success) {
		throw new Resp.Invalid();
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
			id: companyId,
		},
	});

	return { id: companyId };
}

export type PutCompanyByIdData = Awaited<ReturnType<typeof putCompanyByIdData>>;
