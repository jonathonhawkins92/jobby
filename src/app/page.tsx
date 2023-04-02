import Link from "next/link";
import { randomArrayValue } from "~/utils/array";
import { descriptions } from "./layout";
import { SignInPrompt } from "./components/landing-signin";

export default function Home() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center gap-6 py-32 text-center sm:py-48 lg:py-56">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-6xl">
                <p>Welcome to Jobby</p>
            </h1>
            <h2 className="text-lg leading-8 text-slate-800 dark:text-white">
                <p>{randomArrayValue(descriptions)}</p>
            </h2>
            <SignInPrompt />
            <div className="flex items-center justify-center gap-x-3">
                <Link
                    href="/jobs"
                    className="rounded-md border bg-white px-3 py-1 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800"
                >
                    Jobs
                </Link>
                <Link
                    href="/companies"
                    className="rounded-md px-3 py-1 text-sm font-semibold leading-6 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:text-white"
                >
                    Companies
                </Link>
            </div>
        </div>
    );
}

