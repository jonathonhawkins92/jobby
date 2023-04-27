import { prisma } from "prisma/db";

import { InvalidError } from "~/app/api/utils/exception";
import { getAdminUser } from "~/utils/server/user";

import { IdsDatabase } from "./ids/db";
import { OverviewDatabase } from "./overview/db";
import { jobSchema } from "./schema";

class JobDatabase {
	static instance: JobDatabase = new JobDatabase();

	public ids = new IdsDatabase();

	public overview = new OverviewDatabase();

	public async post(input: unknown) {
		await getAdminUser();

		const result = await jobSchema.safeParseAsync(input);
		if (!result.success) {
			throw new InvalidError({
				cause: result.error,
			});
		}

		const job = await prisma.job.create({
			data: result.data,
		});

		return { id: job.id };
	}
}

export default JobDatabase.instance;
