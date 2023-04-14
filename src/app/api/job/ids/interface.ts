import BaseInterface from "~/app/api/utils/interface";

import type { GetIdsData } from "./db";

export class IdsInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/ids`);
	}

	public async get() {
		const { error, success } = await this.fetch<GetIdsData>();
		if (error) {
			throw new Error("Error getting company ids");
		}
		if (!success?.data) {
			return [];
		}
		return success.data;
	}
}
