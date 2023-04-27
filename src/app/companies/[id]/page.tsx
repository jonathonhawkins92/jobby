import type { Metadata } from "next";

import { database } from "~/app/api/database";

import { Header } from "./header";

export const metadata: Metadata = {
	title: "Jobby - Companies",
};

export default async function CompanyPage({
	params,
}: {
	params: { id: string };
}) {
	const company = await database.company.byId(params.id).get();

	if (!company) return <h3>woops</h3>;

	return (
		<>
			{/* @ts-expect-error Server Components */}
			<Header id={params.id} />
			<section className="grow basis-0 overflow-y-auto p-4">hi</section>
		</>
	);
}
