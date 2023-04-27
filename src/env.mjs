import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const isServer = typeof window === "undefined";

export const env = createEnv({
	server: {
		DEPLOYMENT_URL: z.string().url(),
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "test", "production"]),
	},
	client: {},
	runtimeEnv: {
		DEPLOYMENT_URL: process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: process.env.DEPLOYMENT_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
});
