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
		const { fallbackData, ...rest } = init || {};
		const res = await fetch(this.route, rest);
		const json = await res.json();
		const body = json as undefined | { data: ResponseType };
		if (
			!res.ok ||
			!body ||
			!body.data ||
			typeof fallbackData === "undefined"
		) {
			return {
				isError: true,
				isSuccess: false,
				data: undefined,
				error: res.statusText,
			};
		}
		return {
			isError: false,
			isSuccess: true,
			data: body.data || fallbackData,
			error: undefined,
		};
	}
}
