export class APIError extends Error {
    constructor(message?: string, options?: ErrorOptions) {
        const msg = "[API Exception]" + (message ? ` ${message}` : "");
        super(msg, options);
    }
}

export class Invalid extends APIError {
    constructor() {
        super("Invalid Request");
    }
}

export class Unauthorized extends APIError {
    constructor() {
        super("Unauthorized");
    }
}

