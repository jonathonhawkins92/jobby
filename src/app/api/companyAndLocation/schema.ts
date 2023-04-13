import { z } from "zod";
import { companySchema, defaultCompany } from "../company/schema";
import { locationSchema } from "../location/schema";

export const companyAndLocationSchema = companySchema.extend({
    location: z.array(locationSchema),
});

export type CompanyAndLocation = z.infer<typeof companyAndLocationSchema>;

export const defaultCompanyAndLocation: CompanyAndLocation = {
    ...defaultCompany,
    location: [],
};

