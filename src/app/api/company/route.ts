import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";
import { companySchema } from "./model";
import { getAdminUser } from "~/utils/server/user";
import * as Resp from "~/utils/server/response";

export const runtime = "nodejs";

async function postCompanyData(input: unknown) {
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

export async function POST(request: NextRequest) {
    try {
        const input = await request.json();

        const data = await postCompanyData(input);

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

