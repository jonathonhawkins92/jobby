import type { MetadataRoute } from "next";

import * as CompanyDB from "~/app/api/company/ids/db";
import * as JobDB from "~/app/api/job/ids/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [jobIds, companyIds] = await Promise.all([
		JobDB.getIdsData(),
		CompanyDB.getIdsData(),
	]);

	return [
		{
			url: "https://jobby-seven.vercel.app",
			lastModified: new Date(),
		},
		{
			url: "https://jobby-seven.vercel.app/jobs",
			lastModified: new Date(),
		},
		...jobIds.map((job) => ({
			url: `https://jobby-seven.vercel.app/jobs/${job.id}`,
			lastModified: new Date(),
		})),
		{
			url: "https://jobby-seven.vercel.app/companies",
			lastModified: new Date(),
		},
		...companyIds.map((company) => ({
			url: `https://jobby-seven.vercel.app/companies/${company.id}`,
			lastModified: new Date(),
		})),
	];
}
