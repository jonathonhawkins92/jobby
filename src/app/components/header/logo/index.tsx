import Image from "next/image";

export function Logo() {
	return (
		<span className="flex items-center gap-1">
			<Image
				src="/logo.webp"
				height={32}
				width={32}
				alt="The Jobby Logo - a poop emoji"
			/>
			<h1 className="text-xl font-medium">Jobby</h1>
		</span>
	);
}
