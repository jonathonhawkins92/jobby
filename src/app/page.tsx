import Link from "next/link";
import { descriptions } from "./layout";
import { SignInCTA } from "./components/signin-cta";
import { randomArrayValue } from "~/utils/array";
import { Button } from "~/components/button";
import { SignedOut } from "@clerk/nextjs/app-beta";

export default function Home() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center gap-6 py-32 text-center sm:py-48 lg:py-56">
            <h1 className="px-1 text-4xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-6xl">
                <p>Welcome to Jobby</p>
            </h1>
            <h2 className="px-2 text-lg leading-8 text-slate-800 dark:text-white">
                <p>{randomArrayValue(descriptions)}</p>
            </h2>
            <SignedOut>
                <SignInCTA />
            </SignedOut>
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

