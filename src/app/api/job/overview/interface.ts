import BaseInterface from "~/app/api/utils/interface";

import type { Get } from "./db";

export class OverviewInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/overview`);
	}

	public async get() {
		const res = await this.fetch<Get>({
			fallbackData: [],
		});
		if (res.isError) return res;

		console.log(res.data);

		return res;
	}
}
