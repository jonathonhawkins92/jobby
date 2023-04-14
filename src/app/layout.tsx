import "./global.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import pkg from "~/../package.json";
import { randomArrayValue } from "~/utils/array";

import { Header } from "./components/header";
import { Controls } from "./components/header/controls";
import descriptions from "./descriptions";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
	const title = "Jobby";
	const description = randomArrayValue(descriptions);

	return {
		viewport: {
			width: "device-width",
			initialScale: 1,
			maximumScale: 1,
			userScalable: false,
		},
		title,
		description,
		icons: {
			apple: [
				{
					url: `/favicon-180x180.png?${pkg.version}`,
					sizes: "180x180",
					type: "image/png",
					rel: "apple-touch-icon",
				},
			],
			icon: [
				{
					url: `/favicon.ico?${pkg.version}`,
					sizes: "48x48",
					type: "image/x-icon",
					rel: "shortcut icon",
				},
				...[16, 32, 192, 512].map((size) => {
					const sizes = `${size}x${size}`;
					return {
						url: `/favicon-${sizes}.png?${pkg.version}`,
						sizes: `${sizes}`,
						type: "image/png",
						rel: "icon",
					};
				}),
				{
					url: `/safari-pinned-tab.svg?${pkg.version}`,
					sizes: "512x512",
					rel: "mask-icon",
					type: "image/svg+xml",
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore-next-line
					color: "#805836",
				},
			],
		},
		appleWebApp: {
			capable: true,
			title,
			statusBarStyle: "default",
			startupImage: {
				url: `/safari-pinned-tab.svg?${pkg.version}`,
			},
		},
		themeColor: "#805836",
		generator: "Next.js",
		applicationName: "Jobby",
		referrer: "origin-when-cross-origin",
		keywords: [
			"Next.js",
			"React",
			"Job",
			"Career",
			"Jobby",
			"💩",
			"Job Search Website",
		],
		category: "Job Search Website",
		authors: [
			{
				name: "Jonathon Hawkins",
				url: "https://github.com/jonathonhawkins92",
			},
		],
		creator: "Jonathon Hawkins",
		publisher: "Jonathon Hawkins",
		formatDetection: {
			telephone: true,
			date: true,
			address: true,
			email: true,
			url: true,
		},
		robots: {
			index: true,
			follow: true,
			nocache: true,
			noarchive: true,
			noimageindex: true,
			notranslate: false,
			indexifembedded: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
			googleBot: {
				index: true,
				follow: true,
				nocache: true,
				noarchive: true,
				noimageindex: true,
				notranslate: false,
				indexifembedded: false,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		openGraph: {
			title,
			description,
			url: "https://jobby-seven.vercel.app/",
			siteName: title,
			images: [
				{
					url: `/favicon-512x512.png?${pkg.version}`,
					width: 512,
					height: 512,
				},
			],
			locale: "en-GB",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [
				{
					url: `/favicon-512x512.png?${pkg.version}`,
					alt: "The Jobby logo",
					type: "image/png",
					width: 512,
					height: 512,
				},
			],
		},
		manifest: `/manifest.webmanifest?${pkg.version}`,
	};
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html
			lang="en"
			className="dark antialiased"
		>
			<ClerkProvider>
				<body
					className={clsx(
						"bg-violet-300/10 dark:bg-gray-900",
						inter.className
					)}
				>
					<div
						className="fixed inset-x-0 -top-80 -z-10 transform-gpu overflow-hidden blur-3xl"
						aria-hidden="true"
					>
						<div
							className="
							left-[calc(50%-30rem)]
							aspect-[1155/678]
							w-[72.1875rem]
							-translate-x-1/2
							rotate-[30deg]
							bg-gradient-to-tr
							from-purple-500
							to-white
							opacity-20
							dark:from-white
							dark:to-blue-500
							dark:opacity-20
						"
						/>
					</div>
					<div className="flex min-h-screen flex-col">
						<Header className="flex-shrink-0">
							<Controls />
						</Header>
						<div className="container mx-auto flex grow flex-col text-slate-800 dark:text-white">
							{children}
						</div>
					</div>
					<div
						className="fixed -bottom-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl"
						aria-hidden="true"
					>
						<div
							className="
							relative
							aspect-[1155/678]
							w-[72.1875rem]
							bg-gradient-to-tr
							from-purple-500
							to-white
							opacity-40 
							dark:from-white
							dark:to-blue-500
							dark:opacity-20
						"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
				</body>
			</ClerkProvider>
		</html>
	);
}
