"use client";

import { useState } from "react";
import { NavLink } from "./nav-link";
import { NavToggle } from "./nav-toggle";
import clsx from "clsx";

export function Nav() {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <nav
            className="flex min-h-[2rem] flex-wrap items-center justify-end gap-5 sm:flex-nowrap"
            aria-label="Global"
        >
            <div className="sm:hidden">
                <NavToggle
                    isToggled={isToggled}
                    onClick={() => setIsToggled((t) => !t)}
                />
            </div>
            <div
                className={clsx(
                    "grow basis-full overflow-hidden sm:block",
                    isToggled ? "" : "hidden"
                )}
            >
                <ol className="mt-0 flex flex-col justify-end gap-5 sm:flex-row sm:items-center sm:pl-5">
                    <li className="flex justify-end">
                        <NavLink href="/">Home</NavLink>
                    </li>
                    <li className="flex justify-end">
                        <NavLink href="/jobs">Jobs</NavLink>
                    </li>
                    <li className="flex justify-end">
                        <NavLink href="/companies">Companies</NavLink>
                    </li>
                </ol>
            </div>
        </nav>
    );
}

