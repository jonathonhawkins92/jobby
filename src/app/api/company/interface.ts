import BaseInterface from "../utils/interface";

import { IdInterface } from "./[id]/interface";
import type { Post } from "./db";
import { IdsInterface } from "./ids/interface";
import { OverviewInterface } from "./overview/interface";
import type { Company } from "./schema";
import { WithLocationInterface } from "./withLocation/interface";

class CompanyInterface extends BaseInterface {
	private origin = "/company";

	static instance: CompanyInterface = new CompanyInterface("/company");

	public overview = new OverviewInterface(this.origin);
	public ids = new IdsInterface(this.origin);
	public byId(value: string) {
		return new IdInterface(this.origin, value);
	}
	public withLocation = new WithLocationInterface(this.origin);

	public post(data: Company) {
		return this.fetch<Post>({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}
}

export default CompanyInterface.instance;
