import { NextResponse } from "next/server";

export class Unauthorized extends NextResponse {
    constructor() {
        super("Unauthorized", {
            status: 401,
        });
    }
}

export class Created extends NextResponse {
    constructor(response?: Record<string, unknown> | BodyInit | null) {
        if (typeof response === "object") {
            super(JSON.stringify(response), {
                status: 201,
            });
        } else {
            super(response, {
                status: 201,
            });
        }
    }
}

export class InternalServerError extends NextResponse {
    constructor() {
        super("Internal Server Error", {
            status: 500,
        });
    }
}

export class InvalidRequest extends NextResponse {
    constructor() {
        super("Invalid Request", {
            status: 400,
        });
    }
}

export class JsonResponse extends NextResponse {
    constructor(response: Record<string, unknown>) {
        super(JSON.stringify(response), {
            status: 200,
        });
    }
}
