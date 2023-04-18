import { NextResponse } from "next/server";

export class RouteHandlerResponse<SerializedBody> extends NextResponse {
	public serializedBody: SerializedBody;

	constructor(rawBody: SerializedBody, rawInit?: ResponseInit) {
		let body = undefined;
		let init = undefined;
		if (RouteHandlerResponse.isValidBody(rawBody)) {
			body = rawBody;
			init = rawInit;
		} else if (typeof rawBody !== "undefined") {
			body = JSON.stringify({ data: rawBody });
			init = {
				...rawInit,
				headers: {
					...(rawInit?.headers ?? {}),
					"Content-Type": "application/json",
				},
			};
		}

		super(body, init);
		this.serializedBody = rawBody;
	}

	static json<T>(body: T, init?: ResponseInit | undefined) {
		return new RouteHandlerResponse(body, init);
	}

	static isValidBody(
		value: unknown
	): value is
		| ReadableStream
		| Blob
		| BufferSource
		| FormData
		| URLSearchParams
		| string
		| undefined
		| null {
		return (
			value instanceof Blob ||
			ArrayBuffer.isView(value) ||
			typeof value === "string" ||
			typeof value === "undefined" ||
			value === null ||
			value instanceof ReadableStream ||
			value instanceof FormData ||
			value instanceof URLSearchParams
		);
	}
}
