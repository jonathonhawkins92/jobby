import { Breadcrumb } from "~/components/breadcrumb";
import { BreadcrumbItem } from "~/components/breadcrumb/item";
import { AddIcon } from "~/components/icons/add";
import { safeGetAdminUser } from "~/utils/server/user";

import { Modal as CompanyCreateModal } from "./components/modal/companyWithLocation";

export async function Header() {
	const user = await safeGetAdminUser();
	const isAdmin = user !== null;

	return (
		<header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4 dark:border-slate-700">
			<Breadcrumb>
				<BreadcrumbItem isCurrent>Companies</BreadcrumbItem>
			</Breadcrumb>
			{isAdmin && (
				<CompanyCreateModal>
					<AddIcon />
				</CompanyCreateModal>
			)}
		</header>
	);
}
