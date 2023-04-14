import BaseInterface from "~/app/api/utils/interface";

import type { CreateCompanyWithLocationResult } from "./db";
import type { CompanyWithLocation } from "./schema";

export class WithLocationInterface extends BaseInterface {
	constructor(origin: string) {
		super(`${origin}/withLocation`);
	}

	async post(data: CompanyWithLocation) {
		const { error, success } =
			await this.fetch<CreateCompanyWithLocationResult>({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		if (error) {
			throw new Error("Error creating company with location");
		}
		if (!success?.data) {
			return undefined;
		}
		return success.data;
	}
}
