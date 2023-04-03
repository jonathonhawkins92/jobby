"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button } from "~/components/button";

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
            onClick={() =>
                setTheme((current) => {
                    const theme = current === "light" ? "dark" : "light";
                    cookies.set("theme", theme);
                    return theme;
                })
            }
            variant="flatIcon"
        >
            <svg
                className="h-4 w-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <g transform="scale(0.825)">
                    {theme === "dark" ? (
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    ) : (
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        />
                    )}
                </g>
            </svg>
        </Button>
    );
}

