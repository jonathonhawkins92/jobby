import { cookies } from "next/headers";

import { Auth } from "./auth";
import { Nav } from "./nav";
import { ThemeToggle } from "./theme-toggle";

export function Controls() {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme");

    return (
        <div className="flex min-h-[2rem] flex-row flex-wrap items-center justify-end gap-2 sm:flex-row-reverse sm:flex-nowrap sm:gap-5 ">
            <ThemeToggle initialTheme={theme?.value} />
            <Auth />
            <Nav />
        </div>
    );
}

