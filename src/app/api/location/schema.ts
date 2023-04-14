import { z } from "zod";

export const locationSchema = z.object({
	name: z
		.string()
		.min(3, "The location name must be at least 3 letters long"),
	address: z.string(),
	city: z.string(),
	region: z.string().optional(),
	country: z.string(),
});

export type Location = z.infer<typeof locationSchema>;

export const defaultLocation: Location = {
	name: "",
	address: "",
	city: "",
	region: undefined,
	country: "",
};
