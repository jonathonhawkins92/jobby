import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";

import { companySchema } from "../model";
import { getAdminUser } from "~/utils/server/user";
import * as Resp from "~/utils/server/response";

export const runtime = "nodejs";

async function getCompanyByIdData(id: string) {
    const data = await prisma.company.findFirst({
        where: {
            id,
        },
    });
    return data;
}

export type GetCompanyByIdData = Awaited<ReturnType<typeof getCompanyByIdData>>;

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = await getCompanyByIdData(params.id);
        return new Resp.Json(data);
    } catch (_) {
        return new Resp.ServerError();
    }
}

async function putCompanyByIdData(companyId: string, input: unknown) {
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

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const input = await request.json();

        const result = await putCompanyByIdData(params.id, input);

        return new Resp.Created(result);
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

