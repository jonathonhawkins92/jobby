import { SignedIn } from "@clerk/nextjs/app-beta";
import { clsx } from "clsx";
import type { Metadata } from "next";
import Image from "next/image";

import { getOverviewData } from "~/app/api/company/overview/db";
import { Button } from "~/components/button";
import { Card } from "~/components/card";
import { Chip } from "~/components/chip";
import { GoogleMaps } from "~/components/google-maps";
import { AddIcon } from "~/components/icons/add";
import { EditIcon } from "~/components/icons/edit";
import { FavoriteIcon } from "~/components/icons/favorite";
import { InternalLink } from "~/components/link/internal";
import { safeGetAdminUser } from "~/utils/server/user";

import JobButton from "./components/job-button";
import { Modal as CompanyUpdateModal } from "./components/modal/company";
import { Modal as CompanyCreateModal } from "./components/modal/companyWithLocation";

export const metadata: Metadata = {
	title: "Jobby - Companies",
};

const isFav = false;

export default async function Companies() {
	const user = await safeGetAdminUser();
	const isAdmin = user !== null;
	const companies = await getOverviewData();

	return (
		<>
			<header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4 dark:border-slate-700">
				<h1>Companies</h1>
				{isAdmin && (
					<CompanyCreateModal>
						<AddIcon />
					</CompanyCreateModal>
				)}
			</header>
			<section className="grow basis-0 overflow-y-auto p-4">
				<ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
					{companies.map((c) => (
						<li key={c.id}>
							<Card className={clsx(isFav && "border-highlight")}>
								<header
									className={clsx(
										"flex items-start justify-between gap-2 border-b-[1px] border-slate-300 px-2 pb-4 dark:border-slate-700",
										isFav && "border-highlight"
									)}
								>
									<div className="flex flex-1 gap-2">
										{c.logoUrl && (
											<InternalLink
												href={`/companies/${c.id}`}
												className="border-common-color flex h-12 w-12 flex-none shrink-0 items-center justify-center rounded-lg border-[1px] bg-slate-50/40 p-1.5 transition-colors dark:bg-slate-800/40"
											>
												<Image
													className="rounded-sm"
													width={34}
													height={34}
													src={c.logoUrl}
													alt={`${c.name} logo`}
												/>
											</InternalLink>
										)}
										<div>
											<InternalLink
												includeVisited
												href={`/companies/${c.id}`}
											>
												<h1
													className={clsx(
														"border-common-color inline flex-none border-b-[1px] pb-0.5 text-xl font-medium",
														isFav &&
															"border-highlight"
													)}
												>
													{c.name}
												</h1>
											</InternalLink>
											{c.location[0]?.city &&
												c.location[0]?.country && (
													<h2 className="pt-0.5 text-sm text-slate-700 dark:text-slate-300">
														<GoogleMaps
															query={`${c.location[0]?.city}+${c.location[0]?.country}`}
														>
															{`${c.location[0]?.city}, ${c.location[0]?.country}`}
														</GoogleMaps>
													</h2>
												)}
										</div>
									</div>
									<div className="flex max-w-[6.75rem] flex-auto grow-0 flex-wrap justify-end gap-2 ">
										<JobButton
											companyName={c.name}
											companyId={c.id}
										/>
										{isAdmin && (
											<CompanyUpdateModal
												name={c.name}
												logo={c.logoUrl || ""}
												description={
													c.description || ""
												}
												about={c.about || ""}
												industry={c.industry || ""}
												id={c.id}
											>
												<EditIcon />
											</CompanyUpdateModal>
										)}
										<SignedIn>
											<Button
												aria-label="Favorite"
												variant="flatIcon"
												className={clsx(
													isFav &&
														"text-purple-400 dark:text-blue-400"
												)}
											>
												<FavoriteIcon
													isActive={isFav}
												/>
											</Button>
										</SignedIn>
									</div>
								</header>
								<article className="flex flex-col gap-2 px-2 pt-4 ">
									<p>{c.description}</p>
									<div>
										<Chip className="inline-block">
											{c.industry}
										</Chip>
									</div>
								</article>
							</Card>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
