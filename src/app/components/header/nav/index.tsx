"use client";

import { useState } from "react";
import type { PropsWithChildren } from "react";
import { NavLink } from "./link";
import { NavToggle } from "./toggle";
import clsx from "clsx";

function NavListItem({ children }: PropsWithChildren) {
    return <li className="flex justify-end p-1 font-medium">{children}</li>;
}

export function Nav() {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <>
            <div className="sm:hidden">
                <NavToggle
                    isToggled={isToggled}
                    onClick={() => setIsToggled((t) => !t)}
                />
            </div>
            <div
                className={clsx(
                    "grow basis-full sm:block",
                    isToggled ? "" : "hidden"
                )}
            >
                <ol className="mt-0 flex flex-col justify-end gap-5 sm:flex-row sm:items-center">
                    <NavListItem>
                        <NavLink href="/">Home</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/jobs">Jobs</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/companies">Companies</NavLink>
                    </NavListItem>
                </ol>
            </div>
        </>
    );
}

