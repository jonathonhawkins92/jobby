import * as Exceptions from "./exceptions";
import * as Resp from "./response";

export default function ExceptionToResponse(exception: unknown) {
    if (exception instanceof Exceptions.Unauthorized) {
        return new Resp.Unauthorized();
    }
    if (exception instanceof Exceptions.Invalid) {
        return new Resp.Invalid();
    }
    return new Resp.ServerError();
}

