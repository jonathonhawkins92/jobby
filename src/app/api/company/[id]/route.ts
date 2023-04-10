import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";

import { companySchema } from "../model";
import { getAdminUser } from "~/utils/server/user";
import {
    Created,
    InternalServerError,
    InvalidRequest,
    JsonResponse,
    Unauthorized,
} from "~/utils/server/response";

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

        return new JsonResponse({ data: company });
    } catch (_) {
        return new InternalServerError();
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return new Unauthorized();
        }

        const input: unknown = await request.json();
        const result = await companySchema.safeParseAsync(input);

        if (!result.success) {
            return new InvalidRequest();
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

        return new Created({ id: params.id });
    } catch (_) {
        return new InternalServerError();
    }
}

