import BaseInterface from "../utils/interface";

import { IdInterface } from "./[id]/interface";
import { IdsInterface } from "./ids/interface";
import { OverviewInterface } from "./overview/interface";
import type { POST } from "./route";
import type { Company } from "./schema";
import { WithLocationInterface } from "./withLocation/interface";

export type PostReturnType = AwaitedReturnType<typeof POST>["serializedBody"];

class CompanyInterface extends BaseInterface {
	private origin = "/company";

	static instance: CompanyInterface = new CompanyInterface("/company");

	public overview = new OverviewInterface(this.origin);

	public ids = new IdsInterface(this.origin);

	public byId(value: string) {
		return new IdInterface(this.origin, value);
	}

	public withLocation = new WithLocationInterface(this.origin);

	public post(body: Company) {
		return this.json<PostReturnType>({ method: "POST", body });
	}
}

export default CompanyInterface.instance;
