import { z } from "zod";

export const jobSchema = z.object({
	title: z.string(),
	description: z.string(),
	salaryAmount: z.number(),
	salaryCurrencyCode: z.string(),
	publishedAt: z.date().optional(),
	closesAt: z.date(),
	isRemote: z.boolean().default(false),
	companyId: z.string(),
	locationId: z.string(),
});

export type Job = z.infer<typeof jobSchema>;

export const defaultJob: Job = {
	title: "",
	description: "",
	salaryAmount: 0,
	salaryCurrencyCode: "",
	publishedAt: undefined,
	closesAt: new Date(),
	isRemote: false,
	companyId: "",
	locationId: "",
};
