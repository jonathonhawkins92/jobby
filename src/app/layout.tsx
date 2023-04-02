import "./global.css";
import { Header } from "./components/header";
import { Controls } from "./components/header/controls";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { randomArrayValue } from "~/utils/array";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const descriptions = [
    "For when everything goes to 💩 and you need a new job.",
    "For when it all goes down the swanny 💩.",
    "Oh 💩 time for a new job!",
    "When your job is 💩, it's time to find a new one.",
    "Time to flush that old job down the toilet and find something better 💩.",
    "When life hands you 💩, turn it into a new job opportunity.",
    "Feeling stuck in a 💩 job? Let's find you a better one.",
    "Don't let a 💩 job hold you back. Find your next opportunity with us.",
    "Time to step out of the 💩 and into a new career.",
    "Let's turn that 💩 job into a distant memory and find your dream job.",
    "No need to feel stuck in a 💩 job. We've got plenty of opportunities waiting for you.",
    "Don't let a 💩 job bring you down. Start fresh with a new job today.",
    "Don't let a 💩 job define your career. Take the first step towards a better future with us.",
    "Ready to wipe the slate clean and start fresh with a new job? Let's do this 💩.",
    "Don't let a 💩 job clog up your career progress. Let's find a better opportunity together.",
    "Life is too short to be stuck in a 💩 job. Let's find you a job you actually enjoy.",
    "When your job is 💩, it's easy to feel hopeless. But remember, every ending is a new beginning. Let's find you a fresh start.",
    "Don't let a 💩 job stink up your life. It's time to clear the air and find a job that brings you joy.",
];
export const description = randomArrayValue(descriptions);

export function generateMetadata(): Metadata {
    const title = "Jobby - Home";
    return {
        title,
        description,
        icons: {
            icon: [16, 32, 192, 512].map((s) => ({
                url: `/favicon-${s}x${s}.png`,
                sizes: `${s}x${s}`,
                type: "image/png",
            })),
            apple: [
                {
                    url: "/apple-icon.png",
                    sizes: "180x180",
                    type: "image/png",
                },
            ],
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
            siteName: "Jobby",
            images: [
                {
                    url: "https://jobby-seven.vercel.app/favicon-512x512.png",
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
            images: ["https://jobby-seven.vercel.app/favicon-512x512.png"],
        },
    };
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark  dark:bg-gray-900">
            <body
                className={clsx(
                    " overflow-hidden dark:bg-gray-900",
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
							from-[#ff80b5]
							to-[#9089fc]
							opacity-30
							dark:from-white
							dark:to-blue-500
						"
                    />
                </div>
                <ClerkProvider>
                    <div className="flex h-screen flex-col ">
                        <Header className="grow-0">
                            <Controls />
                        </Header>
                        <main className="grow overflow-y-auto">
                            <div className="container mx-auto p-4">
                                {children}
                            </div>
                        </main>
                    </div>
                </ClerkProvider>
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
							from-[#ff80b5]
							to-[#9089fc]
							opacity-30 
						"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></div>
                </div>
            </body>
        </html>
    );
}

