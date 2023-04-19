import { SignedIn } from "@clerk/nextjs/app-beta";
import { clsx } from "clsx";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { database } from "~/app/api/database";
import { Button } from "~/components/button";
import { Card } from "~/components/card";
import { Chip } from "~/components/chip";
import { GoogleMaps } from "~/components/google-maps";
import { EditIcon } from "~/components/icons/edit";
import { FavoriteIcon } from "~/components/icons/favorite";
import { InternalLink } from "~/components/link/internal";
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
				<ol
					aria-label="Breadcrumb"
					className="inline-flex items-center space-x-1 text-sm font-medium"
				>
					<li>
						<div className="flex items-center">
							<h1>
								<Link
									className="link-text-color-interaction"
									href="/companies"
								>
									Companies
								</Link>
							</h1>
						</div>
					</li>
					<li aria-current="page">
						<div className="flex items-center">
							<svg
								aria-hidden="true"
								className="h-6 w-6 text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
							<h1>{company.name}</h1>
						</div>
					</li>
				</ol>

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
