import { getCompanyByIdData } from "~/app/api/company/[id]/db";

export default async function CompanyPage({
	params,
}: {
	params: { id: string };
}) {
	const data = await getCompanyByIdData(params.id);

	return (
		<code>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</code>
	);
}
