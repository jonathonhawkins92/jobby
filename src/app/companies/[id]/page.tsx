import { database } from "~/app/api/database";

export default async function CompanyPage({
	params,
}: {
	params: { id: string };
}) {
	const data = await database.company.byId(params.id).get();

	return (
		<code>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</code>
	);
}
