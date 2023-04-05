"use client";

import { Button } from "~/components/button";
import { Dialog } from "~/components/dialog";
import { AddIcon } from "~/components/icons/add";
import { useToggle } from "~/hooks/useToggle";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { PropsWithChildren } from "react";
import type { Location } from "~/app/api/location/model";
import { defaultCompanyAndLocation } from "~/app/api/companyAndLocation/model";
import type { CompanyAndLocation } from "~/app/api/companyAndLocation/model";
import { Fields as CompanyFields } from "../company/index";
import { useForm, FormProvider } from "react-hook-form";
import { CrossMarkIcon } from "~/components/icons/crossMark";
import { Label } from "~/components/form/label";
import { Form as LocationForm } from "../location/index";
import { Submit } from "~/components/form/input/submit";
import { EditIcon } from "~/components/icons/edit";

function ChipButton({
    children,
    onClick,
}: PropsWithChildren<{
    onClick: () => void;
}>) {
    return (
        <button
            className="cursor-pointer rounded-[5px] px-1 py-1 hover:bg-slate-800"
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
}

function Chip({
    children,
    onRemove,
    onEdit,
}: PropsWithChildren<{
    onRemove: () => void;
    onEdit: () => void;
}>) {
    return (
        <div className="flex items-center gap-0.5 rounded-md border bg-white p-0.5 align-middle text-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:focus:ring-offset-slate-800">
            <ChipButton onClick={() => onEdit()}>
                <EditIcon />
            </ChipButton>
            <span className="border-x-[1px] border-slate-300 px-2 text-sm font-light text-black dark:border-slate-700 dark:text-white">
                {children}
            </span>
            <ChipButton onClick={() => onRemove()}>
                <CrossMarkIcon />
            </ChipButton>
        </div>
    );
}

function LocationField({
    isDisabled = false,
    onSubmit,
    locationNames = [],
    onLocationRemove,
    onLocationEdit,
    name,
    address,
    city,
    country,
    region,
    selectedIndex,
    onClose,
}: {
    isDisabled?: boolean;
    onSubmit: (location: Location, index?: number) => void;
    locationNames?: string[];
    onLocationRemove: (index: number) => void;
    onLocationEdit: (index: number) => void;
    name?: Location["name"];
    address?: Location["address"];
    city?: Location["city"];
    country?: Location["country"];
    region?: Location["region"];
    selectedIndex?: number;
    onClose: () => void;
}) {
    const [isOpen, handleOpen] = useToggle(false);

    function handleClose() {
        handleOpen(false);
        onClose();
    }

    return (
        <>
            <Label>Locations</Label>
            <div className="inline-flex flex-wrap gap-4">
                <Button variant="flatIcon" onClick={() => handleOpen(true)}>
                    <AddIcon />
                </Button>
                <ol className="inline-flex flex-wrap gap-4">
                    {locationNames.map((name, index) => (
                        <li key={index}>
                            <Chip
                                onEdit={() => {
                                    onLocationEdit(index);
                                    handleOpen(true);
                                }}
                                onRemove={() => onLocationRemove(index)}
                            >
                                {name}
                            </Chip>
                        </li>
                    ))}
                </ol>
            </div>
            {isOpen && (
                <Dialog onClick={handleClose}>
                    <div
                        className="max-h-screen rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:max-w-[50%]"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <LocationForm
                            isDisabled={isDisabled}
                            onSubmit={(location) => {
                                onSubmit(location, selectedIndex);
                                handleClose();
                            }}
                            onClose={handleClose}
                            submitButtonText={
                                selectedIndex !== undefined ? "Update" : "Add"
                            }
                            name={name}
                            address={address}
                            city={city}
                            country={country}
                            region={region}
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}

function Form({
    onClose,
    isDisabled = false,
    onSubmit,
    submitButtonText = "Create",
}: {
    onClose: () => void;
    isDisabled?: boolean;
    onSubmit: (company: CompanyAndLocation) => void;
    submitButtonText?: string;
}) {
    const [locationNames, setLocationNames] = useState<string[]>([]);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState<
        undefined | number
    >();
    const methods = useForm<CompanyAndLocation>({
        defaultValues: defaultCompanyAndLocation,
    });
    const { getValues, setValue, handleSubmit } = methods;

    function handleLocationAddition(location: Location, index?: number) {
        const locations = getValues("location");
        if (index !== undefined) {
            locations.splice(index, 1, location);
        } else {
            locations.push(location);
        }
        setValue("location", locations);
        setLocationNames(locations.map((l) => l.name));
    }

    function handleLocationRemoval(index: number) {
        const locations = getValues("location");
        locations.splice(index, 1);
        setValue("location", locations);
        setLocationNames(locations.map((l) => l.name));
    }

    function handleLocationEdit(index: number) {
        setSelectedLocationIndex(index);
    }

    function handleLocationDeselect() {
        setSelectedLocationIndex(undefined);
    }

    const selectedLocation = useMemo(() => {
        if (selectedLocationIndex === undefined) {
            return;
        }
        const locations = getValues("location");
        const location = locations[selectedLocationIndex];
        if (location === undefined) {
            return;
        }
        return location;
    }, [getValues, selectedLocationIndex]);

    return (
        <form
            className="flex max-h-screen flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
            }}
        >
            <header className="flex items-end justify-between border-b-[1px] border-slate-300 p-4  dark:border-slate-700">
                <h1>New Company</h1>
                <Button variant="flatIcon" onClick={() => onClose()}>
                    <CrossMarkIcon />
                </Button>
            </header>
            <article className="flex grow flex-wrap gap-4 overflow-y-auto p-4">
                <FormProvider {...methods}>
                    <CompanyFields isDisabled={isDisabled} />
                    <LocationField
                        isDisabled={isDisabled}
                        onSubmit={handleLocationAddition}
                        locationNames={locationNames}
                        onLocationRemove={handleLocationRemoval}
                        onLocationEdit={handleLocationEdit}
                        name={selectedLocation?.name}
                        address={selectedLocation?.address}
                        city={selectedLocation?.city}
                        country={selectedLocation?.country}
                        region={selectedLocation?.region}
                        selectedIndex={selectedLocationIndex}
                        onClose={handleLocationDeselect}
                    />
                </FormProvider>
            </article>
            <footer className="flex justify-end border-t-[1px] border-slate-300 p-4  dark:border-slate-700">
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

    async function handleSubmit(data: CompanyAndLocation) {
        setIsFetching(true);
        // Mutate external data source
        await fetch("/api/companyAndLocation", {
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
                            onSubmit={(companyAndLocation) =>
                                void handleSubmit(companyAndLocation)
                            }
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}

