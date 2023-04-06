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
import type { PropsWithChildren, FormEvent } from "react";

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
    names = [],
    onRemove,
    onEdit,
    onAdd,
}: {
    isDisabled?: boolean;
    names?: string[];
    onRemove: (index: number) => void;
    onEdit: (index: number) => void;
    onAdd: () => void;
}) {
    return (
        <>
            <Label>Locations</Label>
            <div className="inline-flex flex-wrap gap-4">
                <Button
                    disabled={isDisabled}
                    variant="flatIcon"
                    onClick={() => onAdd()}
                >
                    <AddIcon />
                </Button>
                <ol className="inline-flex flex-wrap gap-4">
                    {names.map((name, index) => (
                        <li key={index}>
                            <Chip
                                onEdit={() => onEdit(index)}
                                onRemove={() => onRemove(index)}
                                isDisabled={isDisabled}
                            >
                                {name}
                            </Chip>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}

function Form({
    onClose,
    isDisabled = false,
    onSubmit,
    onLocationAdd,
    onLocationRemoval,
    onLocationEdit,
    submitButtonText = "Create",
    locationNames = [],
}: {
    onClose: () => void;
    isDisabled?: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onLocationAdd: () => void;
    onLocationRemoval: (index: number) => void;
    onLocationEdit: (index: number) => void;
    submitButtonText?: string;
    locationNames?: string[];
}) {
    return (
        <form
            className=" flex max-h-screen flex-col"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(event);
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
                <CompanyFields isDisabled={isDisabled} />
                <LocationField
                    isDisabled={isDisabled}
                    names={locationNames}
                    onRemove={onLocationRemoval}
                    onEdit={onLocationEdit}
                    onAdd={onLocationAdd}
                />
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

    const [isLocationModalOpen, setIsLocationModalOpen] = useToggle(false);

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    async function handleSubmitToServer(data: CompanyAndLocation) {
        setIsFetching(true);
        await fetch("/api/companyAndLocation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        setIsFetching(false);

        startTransition(() => {
            router.refresh();
        });

        handleCompanyModalClose();
    }

    const isMutating = isFetching || isPending;

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
    }

    function handleLocationRemoval(index: number) {
        const locations = getValues("location");
        locations.splice(index, 1);
        setValue("location", locations);
        setLocationNames(locations.map((l) => l.name));
    }

    function handleLocationModalClose() {
        setIsLocationModalOpen(false);
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
        <FormProvider {...methods}>
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
                            onSubmit={(event) =>
                                void handleSubmit(handleSubmitToServer)(event)
                            }
                            onLocationAdd={() => {
                                setIsLocationModalOpen(true);
                            }}
                            onLocationEdit={(index) => {
                                setSelectedLocationIndex(index);
                                setIsLocationModalOpen(true);
                            }}
                            onLocationRemoval={handleLocationRemoval}
                            locationNames={locationNames}
                        />
                    </DialogClickBarrier>
                </Dialog>
            )}
            {isLocationModalOpen && (
                <Dialog
                    onMouseDown={handleLocationModalClose}
                    onTouchStart={handleLocationModalClose}
                >
                    <DialogClickBarrier className="rounded-md border-2 border-purple-300 bg-white shadow-md shadow-purple-300/90 dark:border-blue-300/40 dark:bg-slate-900 dark:text-white dark:shadow-blue-300/40 sm:max-w-[50%]">
                        <LocationForm
                            isDisabled={isMutating}
                            onSubmit={(location) => {
                                handleLocationAddition(
                                    location,
                                    selectedLocationIndex
                                );
                                handleLocationModalClose();
                                setSelectedLocationIndex(undefined);
                            }}
                            onClose={() => {
                                handleLocationModalClose();
                                setSelectedLocationIndex(undefined);
                            }}
                            submitButtonText={
                                selectedLocationIndex !== undefined
                                    ? "Update"
                                    : "Add"
                            }
                            name={selectedLocation?.name}
                            address={selectedLocation?.address}
                            city={selectedLocation?.city}
                            country={selectedLocation?.country}
                            region={selectedLocation?.region}
                        />
                    </DialogClickBarrier>
                </Dialog>
            )}
        </FormProvider>
    );
}

