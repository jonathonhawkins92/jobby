import BaseInterface from "~/app/api/utils/interface";

import type { GET } from "./route";

export type GetReturnType = AwaitedReturnType<typeof GET>["serializedBody"];

export class IdsInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/ids`);
	}

	public get() {
		return this.fetch<GetReturnType>({ fallbackData: [] });
	}
}
