import type { MetadataRoute } from "next";

import { database } from "~/app/api/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [jobIds, companyIds] = await Promise.all([
		database.job.ids.get(),
		database.company.ids.get(),
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
