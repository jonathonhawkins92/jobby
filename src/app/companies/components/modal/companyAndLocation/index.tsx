"use client";

import { AddIcon } from "~/components/icons/add";
import { Button } from "~/components/button";
import { CrossMarkIcon } from "~/components/icons/crossMark";
import { defaultCompanyAndLocation } from "~/app/api/companyAndLocation/model";
import { Dialog, DialogClickBarrier } from "~/components/dialog";
import { EditIcon } from "~/components/icons/edit";
import { Fields as CompanyFields } from "../company/index";
import { Form as LocationForm } from "../location/index";
import { Label } from "~/components/form/label";
import { Submit } from "~/components/form/input/submit";
import { useForm, FormProvider } from "react-hook-form";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToggle } from "~/hooks/useToggle";
import clsx from "clsx";
import type { CompanyAndLocation } from "~/app/api/companyAndLocation/model";
import type { Location } from "~/app/api/location/model";
import type { PropsWithChildren } from "react";

function ChipButton({
    children,
    onClick,
    isDisabled = false,
}: PropsWithChildren<{
    onClick: () => void;
    isDisabled?: boolean;
}>) {
    return (
        <button
            className="focus input-button input-text input-bg input-bg-interaction rounded-[5px] p-1"
            onClick={() => onClick()}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}

function Chip({
    children,
    onRemove,
    onEdit,
    isDisabled = false,
}: PropsWithChildren<{
    onRemove: () => void;
    onEdit: () => void;
    isDisabled?: boolean;
}>) {
    return (
        <div className="border-common input-bg input-text flex items-center gap-0.5 p-0.5 align-middle ">
            <ChipButton onClick={() => onEdit()} isDisabled={isDisabled}>
                <EditIcon />
            </ChipButton>
            <span
                className={clsx(
                    "border-common-color input-text border-x-[1px] px-2",
                    isDisabled && "input-text-disabled"
                )}
            >
                {children}
            </span>
            <ChipButton onClick={() => onRemove()} isDisabled={isDisabled}>
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
    const [isLocationModalOpen, setIsLocationModalOpen] = useToggle(false);

    function handleLocationModalClose() {
        setIsLocationModalOpen(false);
        onClose();
    }

    return (
        <>
            <Label>Locations</Label>
            <div className="inline-flex flex-wrap gap-4">
                <Button
                    disabled={isDisabled}
                    variant="flatIcon"
                    onClick={() => setIsLocationModalOpen(true)}
                >
                    <AddIcon />
                </Button>
                <ol className="inline-flex flex-wrap gap-4">
                    {locationNames.map((name, index) => (
                        <li key={index}>
                            <Chip
                                onEdit={() => {
                                    onLocationEdit(index);
                                    setIsLocationModalOpen(true);
                                }}
                                onRemove={() => onLocationRemove(index)}
                                isDisabled={isDisabled}
                            >
                                {name}
                            </Chip>
                        </li>
                    ))}
                </ol>
            </div>
            {isLocationModalOpen && (
                <Dialog
                    onMouseDown={handleLocationModalClose}
                    onTouchStart={handleLocationModalClose}
                >
                    <DialogClickBarrier className="rounded-md border-2 border-purple-300 bg-white shadow-md shadow-purple-300/90 dark:border-blue-300/40 dark:bg-slate-900 dark:text-white dark:shadow-blue-300/40 sm:max-w-[50%]">
                        <LocationForm
                            isDisabled={isDisabled}
                            onSubmit={(location) => {
                                onSubmit(location, selectedIndex);
                                handleLocationModalClose();
                            }}
                            onClose={handleLocationModalClose}
                            submitButtonText={
                                selectedIndex !== undefined ? "Update" : "Add"
                            }
                            name={name}
                            address={address}
                            city={city}
                            country={country}
                            region={region}
                        />
                    </DialogClickBarrier>
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
    const { getValues, setValue, handleSubmit, setFocus } = methods;

    function handleLocationAddition(location: Location, index?: number) {
        const locations = getValues("location");
        if (index !== undefined) {
            locations.splice(index, 1, location);
        } else {
            locations.push(location);
        }
        setValue("location", locations);
        setLocationNames(locations.map((l) => l.name));
        setFocus("name");
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
        setFocus("name");
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
            className=" flex max-h-screen flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
            }}
        >
            <header className="border-common-color flex items-end justify-between border-b-[1px] p-4">
                <h1>New Company</h1>
                <Button
                    disabled={isDisabled}
                    variant="flatIcon"
                    onClick={() => onClose()}
                >
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
            <footer className="border-common-color flex justify-end border-t-[1px] p-4">
                <Submit value={submitButtonText} disabled={isDisabled} />
            </footer>
        </form>
    );
}

export function Modal() {
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useToggle(false);

    function handleCompanyModalClose() {
        setIsCompanyModalOpen(false);
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

        handleCompanyModalClose();
    }

    const isMutating = isFetching || isPending;

    return (
        <>
            <Button
                disabled={isMutating}
                variant="flatIcon"
                onClick={() => setIsCompanyModalOpen(true)}
            >
                <AddIcon />
            </Button>
            {isCompanyModalOpen && (
                <Dialog
                    onMouseDown={handleCompanyModalClose}
                    onTouchStart={handleCompanyModalClose}
                >
                    <DialogClickBarrier className="rounded-md border-2 border-purple-300 bg-white shadow-md shadow-purple-300/90 dark:border-blue-300/40 dark:bg-slate-900 dark:text-white dark:shadow-blue-300/40 sm:max-w-[50%]">
                        <Form
                            onClose={handleCompanyModalClose}
                            isDisabled={isMutating}
                            onSubmit={(companyAndLocation) =>
                                void handleSubmit(companyAndLocation)
                            }
                        />
                    </DialogClickBarrier>
                </Dialog>
            )}
        </>
    );
}

