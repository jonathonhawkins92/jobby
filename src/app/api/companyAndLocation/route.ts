import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";
import { companyAndLocationSchema } from "./model";

import { auth } from "@clerk/nextjs/app-beta";

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Not Authorized", {
                status: 401,
            });
        }

        const input: unknown = await request.json();

        const result = await companyAndLocationSchema.safeParseAsync(input);

        if (!result.success) {
            return new NextResponse("Invalid request", {
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

        await prisma.location.createMany({
            data: result.data.location.map((l) => ({
                name: l.name,
                address: l.address,
                city: l.city,
                country: l.country,
                companyId: company.id,
            })),
        });

        return new NextResponse(JSON.stringify({ id: company.id }), {
            status: 201,
        });
    } catch (e) {
        console.error(e);
        return new NextResponse("Server Error", {
            status: 500,
        });
    }
}

