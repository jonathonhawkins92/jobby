import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import Response from "~/app/api/utils/response";

import * as db from "./db";

export async function GET() {
	try {
		const data = await db.getOverviewData();

		return Response.Json(data);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}
