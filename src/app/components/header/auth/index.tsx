import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import { SignInButton } from "./sign-in";
import { User } from "./user";

export function Auth() {
    return (
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <User />
            </SignedIn>
        </>
    );
}

