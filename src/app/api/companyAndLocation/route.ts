import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";
import { companyAndLocationSchema } from "./model";

import { getAdminUser } from "~/utils/server/user";
import * as Resp from "~/utils/server/response";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    try {
        const user = await getAdminUser();

        if (!user) {
            return new Resp.Unauthorized();
        }

        const input: unknown = await request.json();

        const result = await companyAndLocationSchema.safeParseAsync(input);

        if (!result.success) {
            return new Resp.Unauthorized();
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

        return new Resp.Created({ id: company.id });
    } catch (e) {
        console.error(e);
        return new Resp.ServerError();
    }
}

