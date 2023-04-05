import Link from "next/link";
import { descriptions } from "./layout";
import { SignInPrompt } from "./components/landing-signin";
import { randomArrayValue } from "~/utils/array";
import { Button } from "~/components/button";

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
                <Link tabIndex={-1} href="/jobs">
                    <Button>Jobs</Button>
                </Link>
                <Link tabIndex={-1} href="/companies">
                    <Button>Companies</Button>
                </Link>
            </div>
        </div>
    );
}

