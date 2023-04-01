export async function GET(_request: Request) {
	await Promise.resolve();
	return new Response("Hello, Next.js!");
}
