import BaseInterface from "~/app/api/utils/interface";

import type { Company } from "../schema";

import type { GET, PUT } from "./route";

export type GetReturnType = AwaitedReturnType<typeof GET>["serializedBody"];
export type PutReturnType = AwaitedReturnType<typeof PUT>["serializedBody"];

export class IdInterface extends BaseInterface {
	constructor(origin: string, id: string) {
		super(`${origin}/${id}`);
	}

	public get() {
		return this.fetch<GetReturnType>();
	}

	public put(body: Company) {
		return this.json<PutReturnType>({ method: "PUT", body });
	}
}
