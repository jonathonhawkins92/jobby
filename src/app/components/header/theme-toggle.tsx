"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { Button } from "~/components/button";
import { DayIcon } from "~/components/icons/day";
import { NightIcon } from "~/components/icons/night";

const cookies = new Cookies();

const THEME = {
    dark: "dark",
    light: "light",
} as const;

type Theme = ObjectValues<typeof THEME>;

function getTheme(initialTheme?: string) {
    if (typeof initialTheme === "string" && initialTheme in THEME) {
        return initialTheme as Theme;
    }
    if (typeof window === "undefined") {
        return "dark";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    } else {
        return "light";
    }
}

export function ThemeToggle({ initialTheme }: { initialTheme?: string }) {
    const [theme, setTheme] = useState<Theme>(getTheme(initialTheme));

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <Button
            aria-label="theme toggle button"
            onClick={() =>
                setTheme((current) => {
                    const theme = current === "light" ? "dark" : "light";
                    cookies.set("theme", theme);
                    return theme;
                })
            }
            variant="flatIcon"
        >
            {theme === "dark" ? <NightIcon /> : <DayIcon />}
        </Button>
    );
}

