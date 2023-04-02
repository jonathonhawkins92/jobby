import { cookies } from "next/headers";
import { Nav } from "./nav";
import { ThemeToggle } from "./theme-toggle";
import { UserAvatar } from "./user-avatar";

export function Controls() {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme");

    return (
        <div className="flex min-h-[2rem] flex-row flex-wrap items-center justify-end gap-2 sm:flex-row-reverse sm:flex-nowrap sm:gap-5 ">
            <UserAvatar />
            <ThemeToggle initialTheme={theme?.value} />
            <Nav />
        </div>
    );
}

