import { z } from "zod";
import { companySchema, defaultCompany } from "../company/model";
import { locationSchema } from "../location/model";

export const companyAndLocationSchema = companySchema.extend({
    location: z.array(locationSchema),
});

export type CompanyAndLocation = z.infer<typeof companyAndLocationSchema>;

export const defaultCompanyAndLocation: CompanyAndLocation = {
    ...defaultCompany,
    location: [],
};

