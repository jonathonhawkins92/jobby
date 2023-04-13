import type { NextRequest } from "next/server";
import * as Resp from "~/app/api/utils/response";
import * as db from "./db";
import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = await db.getCompanyByIdData(params.id);
        return new Resp.Json(data);
    } catch (_) {
        return new Resp.ServerError();
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const input = await request.json();

        const result = await db.putCompanyByIdData(params.id, input);

        return new Resp.Created(result);
    } catch (exception) {
        return ExceptionToResponse(exception);
    }
}

