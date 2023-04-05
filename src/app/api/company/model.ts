import { z } from "zod";

export const companySchema = z.object({
    logo: z.string().optional(),
    name: z.string().min(3, "The company name must be at least 3 letters long"),
    description: z.string().optional(),
    about: z.string().optional(),
    industry: z.string().optional(),
});

export type Company = z.infer<typeof companySchema>;

export const defaultCompany: Company = {
    logo: undefined,
    name: "",
    description: undefined,
    about: undefined,
    industry: undefined,
};

