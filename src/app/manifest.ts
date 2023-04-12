import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Jobby",
        short_name: "Jobby",
        icons: [
            {
                src: "/android-chrome-192x192.png?v=0.1.0",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png?v=0.1.0",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        theme_color: "#805836",
        background_color: "#805836",
        display: "standalone",
    };
}
