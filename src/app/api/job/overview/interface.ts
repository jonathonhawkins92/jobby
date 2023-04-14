import BaseInterface from "~/app/api/utils/interface";

import type { Get } from "./db";

export class OverviewInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/overview`);
	}

	public get() {
		return this.fetch<Get>({
			fallbackData: [],
		});
	}
}
