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

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return new NextResponse("Not Authorized", {
                status: 401,
            });
        }
        console.log("authed");

        const input: unknown = await request.json();
        const result = await companySchema.safeParseAsync(input);

        if (!result.success) {
            return new NextResponse("Invalid request", {
                status: 400,
            });
        }
        console.log("valid");

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
        console.log("updated");

        return new NextResponse(JSON.stringify({ id: params.id }), {
            status: 201,
        });
    } catch (e) {
        console.error(e);
        return new NextResponse("Server Error", {
            status: 500,
        });
    }
}

