import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";

import { auth } from "@clerk/nextjs/app-beta";
import { companySchema } from "./model";

export async function POST(request: NextRequest) {
    const { userId } = auth();
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

    const company = await prisma.company.create({
        data: {
            ownedBy: userId,
            logoUrl: result.data.logo,
            name: result.data.name,
            description: result.data.description,
            about: result.data.about,
            industry: result.data.industry,
        },
    });

    return new NextResponse(JSON.stringify({ id: company.id }), {
        status: 201,
    });
}

export async function GET() {
    const companies = await prisma.company.findMany();

    return NextResponse.json({ data: companies });
}

