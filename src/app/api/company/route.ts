import type { NextRequest } from "next/server";
import * as Resp from "~/app/api/utils/response";
import * as db from "./db";
import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";

export async function POST(request: NextRequest) {
    try {
        const input = await request.json();

        const data = await db.postCompanyData(input);

        return new Resp.Created(data);
    } catch (exception) {
        return ExceptionToResponse(exception);
    }
}

