import "./global.css";
import { Header } from "./components/header";
import { Nav } from "./components/nav";

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
        <html lang="en">
            <body>
                <div className="h-16">
                    <Header>
                        <Nav />
                    </Header>
                </div>
                <main className="container mx-auto p-4">{children}</main>
            </body>
        </html>
    );
}

