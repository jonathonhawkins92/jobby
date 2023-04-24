import { SignedIn } from "@clerk/nextjs/app-beta";
import { clsx } from "clsx";
import type { Metadata } from "next";
import Link from "next/link";

import { database } from "~/app/api/database";
import { Breadcrumb } from "~/components/breadcrumb";
import { BreadcrumbItem } from "~/components/breadcrumb/item";
import { Button } from "~/components/button";
import { EditIcon } from "~/components/icons/edit";
import { FavoriteIcon } from "~/components/icons/favorite";
import { safeGetAdminUser } from "~/utils/server/user";

import { Modal as CompanyUpdateModal } from "../components/modal/company";

export const metadata: Metadata = {
	title: "Jobby - Companies",
};

const isFav = false;

export default async function CompanyPage({
	params,
}: {
	params: { id: string };
}) {
	const user = await safeGetAdminUser();
	const isAdmin = user !== null;
	const company = await database.company.byId(params.id).get();

	if (!company) return <h3>woops</h3>;

	return (
		<>
			<header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4 dark:border-slate-700">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link
							className="link-text-color-interaction"
							href="/companies"
						>
							Companies
						</Link>
					</BreadcrumbItem>
					<BreadcrumbItem isCurrent>{company.name}</BreadcrumbItem>
				</Breadcrumb>

				<div className="flex gap-2">
					<SignedIn>
						<Button
							aria-label="Favorite"
							variant="flatIcon"
							className={clsx(
								isFav && "text-purple-400 dark:text-blue-400"
							)}
						>
							<FavoriteIcon isActive={isFav} />
						</Button>
					</SignedIn>
					{isAdmin && (
						<CompanyUpdateModal
							name={company.name}
							logo={company.logoUrl || ""}
							description={company.description || ""}
							about={company.about || ""}
							industry={company.industry || ""}
							id={company.id}
						>
							<EditIcon />
						</CompanyUpdateModal>
					)}
				</div>
			</header>
			<section className="grow basis-0 overflow-y-auto p-4">hi</section>
		</>
	);
}
