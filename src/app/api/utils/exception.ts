export class APIError extends Error {
	constructor(message?: string, options?: ErrorOptions) {
		const msg = "[API Exception]" + (message ? ` ${message}` : "");
		super(msg, options);
	}
}

export class InvalidError extends APIError {
	constructor(options?: ErrorOptions) {
		super("Invalid Request", options);
	}
}

export class UnauthorizedError extends APIError {
	constructor(options?: ErrorOptions) {
		super("Unauthorized", options);
	}
}

export class NonAdminError extends UnauthorizedError {
	constructor() {
		super({
			cause: "Non-admin user attempted to access admin-only route",
		});
	}
}
