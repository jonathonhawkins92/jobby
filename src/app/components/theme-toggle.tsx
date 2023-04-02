"use client";

import { useEffect, useState } from "react";

const THEME = {
    dark: "dark",
    light: "light",
} as const;

type Theme = ObjectValues<typeof THEME>;
type ThemeLiteral = `${Theme}`;

function getTheme() {
    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        return "dark";
    } else {
        return "light";
    }
}

export function ThemeToggle() {
    const [theme, setTheme] = useState<ThemeLiteral>(getTheme());

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <button
            id="theme-toggle"
            onClick={() =>
                setTheme((current) => {
                    const theme = current === "dark" ? "light" : "dark";
                    localStorage.theme = theme;
                    return theme;
                })
            }
            type="button"
            className="m-1 inline-flex items-center justify-center gap-2 rounded-md border bg-white p-1 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800"
        >
            <svg
                className="h-5 w-5"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                {theme === "dark" ? (
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                ) : (
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    />
                )}
            </svg>
        </button>
    );
}

