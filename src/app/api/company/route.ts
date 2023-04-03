import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "prisma/db";
import { z } from "zod";

import { getAuth } from "@clerk/nextjs/server";

const locationSchema = z.object({
    name: z
        .string()
        .min(3, "The location name must be at least 3 letters long"),
    address: z.string(),
    city: z.string(),
    region: z.string().optional(),
    country: z.string(),
});

const companySchema = z.object({
    logo: z.string().optional(),
    name: z.string().min(3, "The company name must be at least 3 letters long"),
    description: z.string().optional(),
    about: z.string().optional(),
    industry: z.string().optional(),
    location: z.array(locationSchema),
});

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const input: unknown = await request.json();
    const result = await companySchema.safeParseAsync(input);

    if (!result.success) {
        console.log(result.error);
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
    await prisma.location.createMany({
        data: result.data.location.map((l) => ({
            name: l.name,
            address: l.address,
            city: l.city,
            country: l.country,
            companyId: company.id,
        })),
    });

    return NextResponse.json({ res: input });
}

