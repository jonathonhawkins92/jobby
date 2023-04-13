import * as Resp from "~/app/api/utils/response";
import * as db from "./db";
import ExceptionToResponse from "~/app/api/utils/exceptionToResponse";

export async function GET() {
    try {
        const data = await db.getIdData();

        return new Resp.Json(data);
    } catch (exception) {
        return ExceptionToResponse(exception);
    }
}

