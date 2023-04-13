import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";
import { companyAndLocationSchema } from "./model";

import { getAdminUser } from "~/utils/server/user";
import * as Resp from "~/utils/server/response";

export const runtime = "edge";

async function postCompanyAndLocation(input: unknown) {
    const user = await getAdminUser();

    if (!user) {
        throw new Resp.Unauthorized();
    }

    const result = await companyAndLocationSchema.safeParseAsync(input);

    if (!result.success) {
        throw new Resp.Unauthorized();
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

export async function POST(request: NextRequest) {
    try {
        const input = await request.json();

        const data = await postCompanyAndLocation(input);

        return new Resp.Created(data);
    } catch (error) {
        if (
            error instanceof Resp.Unauthorized ||
            error instanceof Resp.Invalid
        ) {
            return error;
        }
        return new Resp.ServerError();
    }
}

