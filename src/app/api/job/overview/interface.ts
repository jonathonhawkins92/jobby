import BaseInterface from "~/app/api/utils/interface";

import type { GET } from "./route";

export type GetReturnType = AwaitedReturnType<typeof GET>["serializedBody"];

export class OverviewInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/overview`);
	}

	public get() {
		return this.fetch<GetReturnType>({ fallbackData: [] });
	}
}
