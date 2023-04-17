import { env, isServer } from "~/env.mjs";

export default class BaseInterface {
	private readonly base = `${isServer ? env.DEPLOYMENT_URL : ""}/api`;
	protected route = "";

	constructor(route: string) {
		this.route = `${this.base}${route}`;
	}

	public json<ResponseType>(
		init?: Omit<RequestInit, "body"> & {
			fallbackData?: ResponseType;
			body: unknown;
		}
	) {
		return this.fetch<ResponseType>({
			...init,
			headers: {
				...(init?.headers ?? {}),
				"Content-Type": "application/json",
			},
			body: init?.body ? JSON.stringify(init.body) : undefined,
		});
	}

	private success<ResponseType>(data: NonUndefined<ResponseType>) {
		return {
			isError: false,
			isSuccess: true,
			data,
			error: undefined,
		};
	}

	private error(error: string) {
		return {
			isError: true,
			isSuccess: false,
			data: undefined,
			error,
		};
	}

	public async fetch<ResponseType>(
		init?: RequestInit & { fallbackData?: ResponseType }
	) {
		try {
			const { fallbackData, ...config } = init ?? {};
			const res = await fetch(this.route, config);
			const json = await res.json();
			const body = json as undefined | { data: ResponseType };

			if (!res.ok) {
				return this.error(res.statusText);
			} else if (body && typeof body.data !== "undefined") {
				return this.success(body.data);
			} else if (fallbackData && typeof fallbackData !== "undefined") {
				return this.success(fallbackData);
			} else {
				return this.error("No data");
			}
		} catch (exception) {
			if (exception instanceof Error) {
				return this.error(exception.message);
			} else {
				return this.error("Unknown error");
			}
		}
	}
}
