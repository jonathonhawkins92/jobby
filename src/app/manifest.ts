import type { MetadataRoute } from "next";

import pkg from "~/../package.json";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Jobby",
		short_name: "Jobby",
		icons: [192, 512].map((size) => {
			const sizes = `${size}x${size}`;
			return {
				src: `/favicon-${sizes}.png?${pkg.version}`,
				sizes: `${sizes}`,
				type: "image/png",
			};
		}),
		theme_color: "#805836",
		background_color: "#805836",
		display: "standalone",
	};
}
