import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";

import { companySchema } from "../model";
import { getAdminUser } from "~/utils/server/user";
import * as Resp from "~/utils/server/response";

export const runtime = "edge";

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const company = await prisma.company.findFirst({
            where: {
                id: params.id,
            },
        });

        return new Resp.Json({ data: company });
    } catch (_) {
        return new Resp.ServerError();
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
                id: params.id,
            },
        });

        return new Resp.Created({ id: params.id });
    } catch (_) {
        return new Resp.ServerError();
    }
}

