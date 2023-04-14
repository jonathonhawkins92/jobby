import type { NextRequest } from "next/server";

import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import Request from "~/app/api/utils/request";
import Response from "~/app/api/utils/response";

import { ByIdDatabase } from "./db";

type Params = { id: string };

export async function GET(
	_request: NextRequest,
	{ params }: { params: Params }
) {
	try {
		const db = new ByIdDatabase(params.id);

		const data = await db.get();
		return Response.Json(data);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}

export async function PUT(
	rawRequest: NextRequest,
	{ params }: { params: Params }
) {
	try {
		const request = new Request(rawRequest);

		const input = await request.safeJson();

		const db = new ByIdDatabase(params.id);

		const result = await db.put(input);

		return Response.Created(result);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}
