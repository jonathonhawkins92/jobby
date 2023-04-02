import "./global.css";
import { Header } from "./components/header";
import { Nav } from "./components/nav";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { randomArrayValue } from "~/utils/array";

const inter = Inter({ subsets: ["latin"] });

export const descriptions = [
    "For when everything goes to 💩 and you need a new job.",
    "For when it all goes down the swanny.",
    "Oh 💩 time for a new job!",
];

export const metadata = {
    title: "Jobby",
    description: randomArrayValue(descriptions),
};

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
                    className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="
							left-[calc(50%-11rem)]
							aspect-[1155/678]
							w-[36.125rem]
							-translate-x-1/2
							rotate-[30deg]
							bg-gradient-to-tr
							from-[#ff80b5]
							to-[#9089fc]
							opacity-30
							dark:from-white
							dark:to-blue-500
							sm:left-[calc(50%-30rem)]
							sm:w-[72.1875rem]
						"
                    />
                </div>
                <ClerkProvider>
                    <div className="flex h-screen flex-col ">
                        <Header className="grow-0">
                            <Nav />
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
							w-[36.125rem]
							bg-gradient-to-tr
							from-[#ff80b5]
							to-[#9089fc]
							opacity-30
							sm:w-[72.1875rem] 
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

