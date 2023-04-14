import { IdsDatabase } from "./ids/db";
import { OverviewDatabase } from "./overview/db";

class JobDatabase {
	static instance: JobDatabase = new JobDatabase();
	public ids = new IdsDatabase();
	public overview = new OverviewDatabase();
}

export default JobDatabase.instance;
