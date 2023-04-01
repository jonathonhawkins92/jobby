import "./globals.css";

export const metadata = {
	title: "Jobby",
	description: "For when everything goes to 💩 and you need a new job.",
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
