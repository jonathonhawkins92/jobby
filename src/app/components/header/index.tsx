import { clsx } from "clsx";
import Link from "next/link";

import { Controls } from "./controls";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { NavToggle } from "./nav/toggle";

export function Header({ className }: { className?: string }) {
	const controls = <Controls />;
	return (
		<header
			className={clsx(
				"z-50 border-b border-slate-200 bg-white/10 p-4 text-sm dark:border-slate-700 dark:bg-gray-900/10 ",
				className
			)}
		>
			<nav className="container mx-auto flex w-full flex-wrap items-start justify-between">
				<div className="flex flex-1 items-start justify-start gap-5">
					<Link
						href="/"
						className="focus flex-none rounded-md"
					>
						<Logo />
					</Link>
				</div>
				<div className="hidden flex-1 sm:flex sm:justify-center sm:gap-5">
					<Nav />
				</div>
				<div className="flex flex-none flex-wrap items-center justify-end gap-5 sm:flex-1">
					<div className="hidden items-center gap-5  sm:inline-flex">
						{controls}
					</div>
					<div className="flex flex-wrap items-start justify-end gap-5 sm:hidden">
						{controls}
						<NavToggle>
							<Nav />
						</NavToggle>
					</div>
				</div>
			</nav>
		</header>
	);
}
