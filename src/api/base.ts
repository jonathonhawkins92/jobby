import { env, isServer } from "~/env.mjs";

export default class BaseAPI {
    private readonly baseUrl = `${
        isServer ? env.VERCEL_URL || env.DEPLOYMENT_URL : ""
    }/api`;

    async fetch<ResponseType>(
        input: string,
        init?: RequestInit
    ): Promise<{
        success?: { data?: ResponseType };
        error?: string;
    }> {
        const res = await fetch(`${this.baseUrl}${input}`, init);
        const json = await res.json();
        const data = json as { data?: ResponseType };
        if (!res.ok) {
            return {
                success: undefined,
                error: res.statusText,
            };
        }
        return {
            success: data,
            error: undefined,
        };
    }
}

