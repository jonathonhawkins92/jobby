import { env, isServer } from "~/env.mjs";

export default class BaseInterface {
	private readonly base = `${isServer ? env.DEPLOYMENT_URL : ""}/api`;
	protected route = "";

	constructor(route: string) {
		this.route = `${this.base}${route}`;
	}

	protected async fetch<ResponseType>(
		init?: RequestInit & { fallbackData?: ResponseType }
	): Promise<
		| {
				isError: true;
				isSuccess: false;
				data: undefined;
				error: string;
		  }
		| {
				isError: false;
				isSuccess: true;
				data: ResponseType;
				error: undefined;
		  }
	> {
		try {
			const { fallbackData, ...rest } = init || {};
			const res = await fetch(this.route, rest);
			const json = await res.json();
			const body = json as undefined | { data: ResponseType };

			if (!res.ok) {
				return {
					isError: true,
					isSuccess: false,
					data: undefined,
					error: res.statusText,
				};
			} else if (body && body.data) {
				return {
					isError: false,
					isSuccess: true,
					data: body.data,
					error: undefined,
				};
			} else if (typeof fallbackData !== "undefined") {
				return {
					isError: false,
					isSuccess: true,
					data: fallbackData,
					error: undefined,
				};
			} else {
				return {
					isError: true,
					isSuccess: false,
					data: undefined,
					error: "No data",
				};
			}
		} catch (exception) {
			if (exception instanceof Error) {
				return {
					isError: true,
					isSuccess: false,
					data: undefined,
					error: exception.message,
				};
			} else {
				return {
					isError: true,
					isSuccess: false,
					data: undefined,
					error: "Unknown error",
				};
			}
		}
	}
}
