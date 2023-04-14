import { z } from "zod";

import { locationSchema } from "../../location/schema";
import { companySchema, defaultCompany } from "../schema";

export const companyWithLocationSchema = companySchema.extend({
	location: z.array(locationSchema),
});

export type CompanyWithLocation = z.infer<typeof companyWithLocationSchema>;

export const defaultCompanyWithLocation: CompanyWithLocation = {
	...defaultCompany,
	location: [],
};
