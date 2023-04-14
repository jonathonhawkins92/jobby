import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";
import Response from "~/app/api/utils/response";

import { IdsDatabase } from "./db";

export async function GET() {
	try {
		const db = new IdsDatabase();

		const data = await db.get();

		return Response.Json(data);
	} catch (exception) {
		return ExceptionToResponse(exception);
	}
}
