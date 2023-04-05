import { z } from "zod";
import { companySchema, defaultCompany } from "../company/model";
import { locationSchema, defaultLocation } from "../location/model";

const companyAndLocationSchema = companySchema.extend({
    location: z.array(locationSchema),
});

export type CompanyAndLocation = z.infer<typeof companyAndLocationSchema>;

export const defaultCompanyAndLocation: CompanyAndLocation = {
    ...defaultCompany,
    location: [defaultLocation],
};

