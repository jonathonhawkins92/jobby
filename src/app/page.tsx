import Link from "next/link";
import { randomArrayValue } from "~/utils/array";
import { descriptions } from "./layout";

export default function Home() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center py-32 text-center sm:py-48 lg:py-56">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-6xl">
                <p>Welcome to Jobby</p>
            </h1>
            <h2 className="mt-6 text-lg leading-8 text-slate-800 dark:text-white">
                <p>{randomArrayValue(descriptions)}</p>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-x-6">
                <Link
                    href="/jobs"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Jobs
                </Link>
                <Link
                    href="/companies"
                    className="text-sm font-semibold leading-6 text-slate-800 dark:text-white"
                >
                    Companies
                </Link>
            </div>
        </div>
    );
}

