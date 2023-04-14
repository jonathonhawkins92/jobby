import BaseInterface from "../utils/interface";

import { IdInterface } from "./[id]/interface";
import type { PostCompanyByIdData } from "./db";
import { IdsInterface } from "./ids/interface";
import { OverviewInterface } from "./overview/interface";
import type { Company } from "./schema";
import { WithLocationInterface } from "./withLocation/interface";

class Interface extends BaseInterface {
	private origin = "/company";

	static instance: Interface = new Interface("/company");

	public overview = new OverviewInterface(this.origin);
	public ids = new IdsInterface(this.origin);
	public byId(value: string) {
		return new IdInterface(this.origin, value);
	}
	public withLocation = new WithLocationInterface(this.origin);

	async post(data: Company) {
		const { error, success } = await this.fetch<PostCompanyByIdData>({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (error) {
			throw new Error("Error creating company");
		}
		if (!success?.data) {
			return undefined;
		}
		return success.data;
	}
}

export const CompanyInterface = Interface.instance;
export default Interface.instance;
