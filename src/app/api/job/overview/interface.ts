import BaseInterface from "~/app/api/utils/interface";

import type { GetOverviewData } from "./db";

export class OverviewInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/overview`);
	}

	public async get() {
		const { error, success } = await this.fetch<GetOverviewData>();
		if (error) {
			throw new Error("Error getting company overview");
		}
		if (!success?.data) {
			return [];
		}
		return success.data;
	}
}
