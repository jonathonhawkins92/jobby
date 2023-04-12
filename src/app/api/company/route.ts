import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";

import { companySchema } from "./model";
import { getAdminUser } from "~/utils/server/user";
import * as Resp from "~/utils/server/response";

export async function POST(request: NextRequest) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return new Resp.Unauthorized();
        }

        const input: unknown = await request.json();
        const result = await companySchema.safeParseAsync(input);

        if (!result.success) {
            return new Resp.Invalid();
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

        return new Resp.Created({ id: company.id });
    } catch (_) {
        return new Resp.ServerError();
    }
}

export async function GET() {
    try {
        const companies = await prisma.company.findMany();

        return new Resp.Json({ data: companies });
    } catch (_) {
        return new Resp.ServerError();
    }
}

