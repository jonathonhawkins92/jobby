export class Unauthorized extends Response {
    constructor(init: ResponseInit = {}) {
        super("Unauthorized", {
            status: 401,
            ...init,
        });
    }
}

export class Created extends Response {
    constructor(body?: Record<string, unknown>, init: ResponseInit = {}) {
        const payload = body ? JSON.stringify(body) : "Created";
        super(payload, { status: 201, ...init });
    }
}

export class ServerError extends Response {
    constructor(init: ResponseInit = {}) {
        super("Internal Server Error", {
            status: 500,
            ...init,
        });
    }
}

export class Invalid extends Response {
    constructor(init: ResponseInit = {}) {
        super("Invalid Request", {
            status: 400,
            ...init,
        });
    }
}

export class Json extends Response {
    constructor(response: Record<string, unknown>, init: ResponseInit = {}) {
        super(JSON.stringify(response), { status: 200, ...init });
    }
}

