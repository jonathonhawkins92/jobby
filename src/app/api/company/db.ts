import { prisma } from "prisma/db";
import * as Resp from "~/app/api/utils/response";
import { getAdminUser } from "~/utils/server/user";

import { companySchema } from "./schema";


export async function postCompanyData(input: unknown) {
    const user = await getAdminUser();
    if (!user) {
        throw new Resp.Unauthorized();
    }

    const result = await companySchema.safeParseAsync(input);
    if (!result.success) {
        throw new Resp.Invalid();
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

export type PostCompanyByIdData = Awaited<ReturnType<typeof postCompanyData>>;

