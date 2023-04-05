import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";

import { getAuth } from "@clerk/nextjs/server";
import { companySchema } from "../model";

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    const companies = await prisma.company.findFirst({
        where: {
            id: params.id,
        },
    });

    return NextResponse.json({ data: companies });
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { userId } = getAuth(request);
    if (!userId) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const input: unknown = await request.json();
    const result = await companySchema.safeParseAsync(input);

    if (!result.success) {
        return new NextResponse(undefined, {
            status: 400,
        });
    }

    await prisma.company.update({
        data: {
            ownedBy: userId,
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

    return new NextResponse(undefined, {
        status: 201,
    });
}

