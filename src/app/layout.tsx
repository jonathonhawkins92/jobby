import "./globals.css";

const descriptions = [
	"For when everything goes to 💩 and you need a new job.",
	"For when it all goes down the swanny.",
]


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
			<body>{children}</body>
		</html>
	);
}
