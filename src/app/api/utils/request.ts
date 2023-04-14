import type { NextRequest } from "next/server";

import { InvalidError } from "./exception";

export default class NextRequestWrapper {
	static async safeArrayBuffer(request: NextRequest) {
		try {
			const data = await request.arrayBuffer();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Array Buffer" });
		}
	}

	static async safeJson(request: NextRequest) {
		try {
			const data = await request.json();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid JSON" });
		}
	}

	static async safeText(request: NextRequest) {
		try {
			const data = await request.text();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Text" });
		}
	}

	static async safeBlob(request: NextRequest) {
		try {
			const data = await request.blob();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Blob" });
		}
	}

	static async safeFormData(request: NextRequest) {
		try {
			const data = await request.formData();
			return data;
		} catch (exception) {
			throw new InvalidError({ cause: "Invalid Form Data" });
		}
	}
}
