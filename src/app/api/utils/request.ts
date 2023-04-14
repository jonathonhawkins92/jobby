/* eslint-disable @typescript-eslint/unbound-method */
import { NextRequest } from "next/server";

import { InvalidError } from "./exception";

export default class NextRequestWrapper extends NextRequest {
	constructor(request: NextRequest) {
		super(request);
	}

	async safeArrayBuffer() {
		try {
			const data = await this.arrayBuffer();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Array Buffer" });
		}
	}

	async safeJson() {
		try {
			const data = await this.json();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid JSON" });
		}
	}

	async safeText() {
		try {
			const data = await this.text();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Text" });
		}
	}

	async safeBlob() {
		try {
			const data = await this.blob();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Blob" });
		}
	}

	async safeFormData() {
		try {
			const data = await this.formData();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Form Data" });
		}
	}
}
