import type { NextRequest } from "next/server";

import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import Request from "~/app/api/utils/request";
import Response from "~/app/api/utils/response";

import { WithLocationDatabase } from "./db";

export async function POST(request: NextRequest) {
	try {
		const input = await Request.safeJson(request);

		const db = new WithLocationDatabase();

		const data = await db.post(input);

		return Response.Created(data);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}
