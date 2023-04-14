import { UnauthorizedError, InvalidError } from "./exception";
import Response from "./response";

export default function ExceptionToResponse(exception: unknown) {
	if (exception instanceof UnauthorizedError) {
		return Response.Unauthorized();
	}
	if (exception instanceof InvalidError) {
		return Response.InvalidRequest();
	}
	return Response.InternalServerError();
}
