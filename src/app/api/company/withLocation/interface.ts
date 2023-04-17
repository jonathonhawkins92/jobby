import BaseInterface from "~/app/api/utils/interface";

import type { POST } from "./route";
import type { CompanyWithLocation } from "./schema";

export type PostReturnType = AwaitedReturnType<typeof POST>["serializedBody"];

export class WithLocationInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/withLocation`);
	}

	public post(body: CompanyWithLocation) {
		return this.json<PostReturnType>({ method: "POST", body });
	}
}
