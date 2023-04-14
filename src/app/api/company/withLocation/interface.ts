import BaseInterface from "~/app/api/utils/interface";

import type { Post } from "./db";
import type { CompanyWithLocation } from "./schema";

export class WithLocationInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/withLocation`);
	}

	public post(data: CompanyWithLocation) {
		return this.fetch<Post>({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}
}
