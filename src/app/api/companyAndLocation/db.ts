import { prisma } from "prisma/db";
import { companyAndLocationSchema } from "./schema";

import { getAdminUser } from "~/utils/server/user";
import * as Exceptions from "~/app/api/utils/exceptions";

export async function postCompanyAndLocation(input: unknown) {
    const user = await getAdminUser();

    if (!user) {
        throw new Exceptions.Unauthorized();
    }

    const result = await companyAndLocationSchema.safeParseAsync(input);

    if (!result.success) {
        throw new Exceptions.Invalid();
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

export type PostCompanyAndLocation = Awaited<
    ReturnType<typeof postCompanyAndLocation>
>;

