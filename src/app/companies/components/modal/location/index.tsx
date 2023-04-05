"use client";

import { Button } from "~/components/button";
import { Dialog } from "~/components/dialog";
import { AddIcon } from "~/components/icons/add";
import { useToggle } from "~/hooks/useToggle";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TextInput } from "~/components/form/input/text";
import { Label } from "~/components/form/label";
import { CrossMarkIcon } from "~/components/icons/crossMark";
import type { Location } from "~/app/api/location/model";
import { defaultLocation } from "~/app/api/location/model";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Submit } from "~/components/form/input/submit";

export function Fields({ isDisabled }: { isDisabled: boolean }) {
    const { register } = useFormContext<Location>();
    return (
        <>
            <Label htmlFor="name">Name</Label>
            <TextInput
                placeholder="The name of the location"
                {...register("name", {
                    required: false,
                    disabled: isDisabled,
                })}
            />
            <Label htmlFor="address">Address</Label>
            <TextInput
                placeholder="The street, building number and post/zip code"
                {...register("address", {
                    required: true,
                    disabled: isDisabled,
                })}
            />
            <Label htmlFor="city">City</Label>
            <TextInput
                placeholder="Which city is it based?"
                {...register("city", {
                    required: true,
                    disabled: isDisabled,
                })}
            />
            <Label htmlFor="region">Region</Label>
            <TextInput
                placeholder="Which region is it in?"
                {...register("region")}
            />
            <Label htmlFor="country">Country</Label>
            <TextInput
                placeholder="What country is it based in?"
                {...register("country", {
                    required: true,
                    disabled: isDisabled,
                })}
            />
        </>
    );
}

export function Form({
    onClose,
    isDisabled = false,
    onSubmit,
    submitButtonText = "Create",
    name,
    address,
    city,
    country,
    region,
}: {
    onClose: () => void;
    isDisabled?: boolean;
    onSubmit: (location: Location) => void;
    submitButtonText?: string;
    name?: Location["name"];
    address?: Location["address"];
    city?: Location["city"];
    country?: Location["country"];
    region?: Location["region"];
}) {
    const methods = useForm<Location>({
        defaultValues: {
            ...defaultLocation,
            name,
            address,
            city,
            country,
            region,
        },
    });

    return (
        <form
            className="flex max-h-screen flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                void methods.handleSubmit(onSubmit)(e);
            }}
        >
            <header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4 dark:border-slate-700">
                <h1>Location</h1>
                <Button variant="flatIcon" onClick={() => onClose()}>
                    <CrossMarkIcon />
                </Button>
            </header>
            <article className="flex grow flex-wrap gap-4 overflow-y-auto p-4">
                <FormProvider {...methods}>
                    <Fields isDisabled={isDisabled} />
                </FormProvider>
            </article>
            <footer className="flex justify-end border-t-[1px] border-slate-300 p-4 dark:border-slate-700">
                <Submit value={submitButtonText} disabled={isDisabled} />
            </footer>
        </form>
    );
}

export function Modal() {
    const [isOpen, handleOpen] = useToggle();

    function onClose() {
        handleOpen(false);
    }

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    async function handleSubmit(data: Location) {
        setIsFetching(true);
        // Mutate external data source
        await fetch("/api/location", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        setIsFetching(false);

        startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            router.refresh();
        });

        onClose();
    }

    const isMutating = isFetching || isPending;

    function stopPropagation(e: { stopPropagation: () => void }) {
        e.stopPropagation();
    }

    return (
        <>
            <Button variant="flatIcon" onClick={() => handleOpen(true)}>
                <AddIcon />
            </Button>
            {isOpen && (
                <Dialog onMouseDown={onClose} onTouchStart={onClose}>
                    <div
                        className="rounded-md border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:max-w-[50%]"
                        onMouseDown={stopPropagation}
                        onTouchStart={stopPropagation}
                    >
                        <Form
                            onClose={onClose}
                            isDisabled={isMutating}
                            onSubmit={(location) => void handleSubmit(location)}
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}

