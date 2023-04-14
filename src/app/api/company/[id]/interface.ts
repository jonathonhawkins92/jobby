import BaseInterface from "~/app/api/utils/interface";

import type { Company } from "../schema";

import type { GetCompanyByIdData, PutCompanyByIdData } from "./db";

export class IdInterface extends BaseInterface {
	constructor(origin: string, id: string) {
		super(`${origin}/${id}`);
	}

	public async get() {
		const { error, success } = await this.fetch<GetCompanyByIdData>();
		if (error) {
			throw new Error("Error getting company ids");
		}
		if (!success?.data) {
			return [];
		}
		return success.data;
	}

	public async put(data: Company) {
		const { error, success } = await this.fetch<PutCompanyByIdData>({
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (error) {
			throw new Error("Error updating company");
		}
		if (!success?.data) {
			return undefined;
		}
		return success.data;
	}
}
