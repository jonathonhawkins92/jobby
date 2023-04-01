import "./global.css";
import { Header } from "./components/header";
import { Nav } from "./components/nav";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

const inter = Inter({ subsets: ["latin"] });

const descriptions = [
    "For when everything goes to 💩 and you need a new job.",
    "For when it all goes down the swanny.",
];

export const metadata = {
    title: "Jobby",
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark  dark:bg-gray-900">
            <body className={clsx(" dark:bg-gray-900", inter.className)}>
                <ClerkProvider>
                    <Header>
                        <Nav />
                    </Header>
                    <main className="container mx-auto p-4">{children}</main>
                </ClerkProvider>
            </body>
        </html>
    );
}

