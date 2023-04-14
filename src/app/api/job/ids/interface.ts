import BaseInterface from "~/app/api/utils/interface";

import type { Get } from "./db";

export class IdsInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/ids`);
	}

	public get() {
		return this.fetch<Get>({ fallbackData: [] });
	}
}
