import { NextResponse } from "next/server";

export function GET() {
    return new NextResponse("hello my friend c:", {
        status: 200,
    });
}

