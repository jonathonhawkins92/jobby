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
                <Header>
                    <Nav />
                </Header>
                <main>{children}</main>
            </body>
        </html>
    );
}

