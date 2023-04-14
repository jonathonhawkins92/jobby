import BaseInterface from "~/app/api/utils/interface";

import type { Company } from "../schema";

import type { Get, Put } from "./db";

export class IdInterface extends BaseInterface {
	constructor(origin: string, id: string) {
		super(`${origin}/${id}`);
	}

	public get() {
		return this.fetch<Get>();
	}

	public put(data: Company) {
		return this.fetch<Put>({
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}
}
