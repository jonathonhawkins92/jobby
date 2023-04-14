import { env, isServer } from "~/env.mjs";

export default class BaseInterface {
	private readonly base = `${isServer ? env.DEPLOYMENT_URL : ""}/api`;
	protected route = "";

	constructor(route: string) {
		this.route = `${this.base}${route}`;
	}

	protected async fetch<ResponseType>(init?: RequestInit): Promise<{
		isError: boolean;
		isSuccess: boolean;
		success?: { data?: ResponseType };
		error?: string;
	}> {
		const res = await fetch(this.route, init);
		const json = await res.json();
		const data = json as { data?: ResponseType };
		if (!res.ok) {
			return {
				isError: true,
				isSuccess: false,
				success: undefined,
				error: res.statusText,
			};
		}
		return {
			isError: false,
			isSuccess: false,
			success: data,
			error: undefined,
		};
	}
}
