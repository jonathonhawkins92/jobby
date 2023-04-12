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

export class ServerError extends NextResponse {
    constructor() {
        super("Internal Server Error", {
            status: 500,
        });
    }
}

export class Invalid extends NextResponse {
    constructor() {
        super("Invalid Request", {
            status: 400,
        });
    }
}

export class Json extends NextResponse {
    constructor(response: Record<string, unknown>, status = 200) {
        super(JSON.stringify(response), { status });
    }
}

