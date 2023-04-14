import type { NextRequest } from "next/server";

import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import Request from "~/app/api/utils/request";
import Response from "~/app/api/utils/response";

import * as db from "./db";

export async function GET(
	_request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const data = await db.getCompanyByIdData(params.id);
		return Response.Json(data);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}

export async function PUT(
	rawRequest: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const request = new Request(rawRequest);

		const input = await request.safeJson();

		const result = await db.putCompanyByIdData(params.id, input);

		return Response.Created(result);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}
