import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export function Header({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<header
			className={clsx(
				"top-0 z-50 border-b border-slate-200 bg-white/10 p-4	 text-sm dark:border-slate-700 dark:bg-gray-900/10 ",
				className
			)}
		>
			<nav className="container mx-auto flex w-full flex-wrap items-start justify-between">
				<Link
					href="/"
					className="focus flex flex-none items-end gap-1 rounded-md p-0.5"
				>
					<Image
						src="/logo.webp"
						height={32}
						width={32}
						alt="The Jobby Logo - a poop emoji"
					/>
					<h1 className="text-xl font-medium text-slate-700 dark:text-slate-200">
						Jobby
					</h1>
				</Link>
				{children}
			</nav>
		</header>
	);
}
