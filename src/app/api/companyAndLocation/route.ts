import type { NextRequest } from "next/server";
import * as Resp from "~/app/api/utils/response";
import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import * as db from "./db";

export async function POST(request: NextRequest) {
    try {
        const input = await request.json();

        const data = await db.postCompanyAndLocation(input);

        return new Resp.Created(data);
    } catch (exception) {
        return ExceptionToResponse(exception);
    }
}

