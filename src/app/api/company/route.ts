import type { NextRequest } from "next/server";

import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import Request from "~/app/api/utils/request";
import Response from "~/app/api/utils/response";

import db from "./db";

export async function POST(rawRequest: NextRequest) {
	try {
		const request = new Request(rawRequest);

		const input = await request.safeJson();

		const output = await db.post(input);

		return Response.Created(output);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}
