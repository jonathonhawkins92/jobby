"use client";

import { Button } from "~/components/button";
import { Dialog } from "~/components/dialog";
import { AddIcon } from "~/components/icons/add";
import { useToggle } from "~/hooks/useToggle";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TextInput } from "~/components/form/input/text";
import { TextareaInput } from "~/components/form/input/textarea";
import { Label } from "~/components/form/label";
import { useWizard, Wizard } from "react-use-wizard";
import { CrossMarkIcon } from "~/components/icons/crossMark";
import type { CompanyAndLocation } from "~/app/api/companyAndLocation/model";
import { defaultCompanyAndLocation } from "~/app/api/companyAndLocation/model";
import {
    useForm,
    useFieldArray,
    FormProvider,
    useFormContext,
} from "react-hook-form";
import { defaultLocation } from "~/app/api/location/model";

function CompanyCreationForm({
    onClose,
    isDisabled = false,
}: {
    onClose: () => void;
    isDisabled?: boolean;
}) {
    const { nextStep } = useWizard();
    const {
        register,
        formState: { errors },
    } = useFormContext<CompanyAndLocation>();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void nextStep();
            }}
        >
            <header className="flex justify-between px-4">
                <h1>New Company</h1>
                <Button variant="flatIcon" onClick={() => onClose()}>
                    <CrossMarkIcon />
                </Button>
            </header>
            <article className="mt-2 flex grow flex-wrap gap-4 overflow-y-auto px-4">
                <Label htmlFor="name">Name</Label>
                <TextInput
                    id="name"
                    placeholder="name"
                    {...register("name", {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
                {errors.name && <span>{errors.name.message}</span>}
                <Label htmlFor="logo">Logo</Label>
                <TextInput
                    id="logo"
                    placeholder="Logo url"
                    {...register("logo", {
                        disabled: isDisabled,
                    })}
                />
                <Label htmlFor="description">Description</Label>
                <TextareaInput
                    id="description"
                    placeholder="Description"
                    {...register("description", {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
                <Label htmlFor="about">About</Label>
                <TextareaInput
                    id="about"
                    placeholder="About"
                    {...register("about", {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
                <Label htmlFor="industry">Industry</Label>
                <TextInput
                    id="industry"
                    placeholder="industry"
                    {...register("industry", {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
            </article>
            <footer className="mt-2 flex justify-end px-4">
                <Button>
                    <input type="submit" value="Next" disabled={isDisabled} />
                </Button>
            </footer>
        </form>
    );
}
function LocationCreationForm({
    index,
    onClose,
    isDisabled = false,
    onLocationAdd,
    onLocationRemove,
}: {
    index: number;
    onClose: () => void;
    isDisabled?: boolean;
    onLocationAdd: () => void;
    onLocationRemove?: () => void;
}) {
    const { nextStep, previousStep } = useWizard();
    const { register } = useFormContext<CompanyAndLocation>();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void nextStep();
            }}
        >
            <header className="flex justify-between px-4">
                <h1>New Location</h1>
                <Button variant="flatIcon" onClick={() => onClose()}>
                    <CrossMarkIcon />
                </Button>
            </header>
            <article className="mt-2 flex grow flex-wrap gap-4 overflow-y-auto px-4">
                <Label htmlFor="name">Name</Label>
                <TextInput
                    placeholder="name"
                    {...register(`location.${index}.name`, {
                        required: false,
                        disabled: isDisabled,
                    })}
                />
                <Label htmlFor="address">Address</Label>
                <TextInput
                    placeholder="address"
                    {...register(`location.${index}.address`, {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
                <Label htmlFor="city">City</Label>
                <TextInput
                    placeholder="city"
                    {...register(`location.${index}.city`, {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
                <Label htmlFor="region">Region</Label>
                <TextInput
                    placeholder="region"
                    {...register(`location.${index}.region`)}
                />
                <Label htmlFor="country">Country</Label>
                <TextInput
                    placeholder="country"
                    {...register(`location.${index}.country`, {
                        required: true,
                        disabled: isDisabled,
                    })}
                />
            </article>
            <footer className="mt-2 flex justify-between px-4">
                <Button onClick={() => previousStep()}>Previous</Button>
                {onLocationRemove && (
                    <Button onClick={() => onLocationRemove()}>
                        Remove this location
                    </Button>
                )}
                <Button onClick={() => onLocationAdd()}>
                    Add another location
                </Button>
                <Button>
                    <input type="submit" value="Next" disabled={isDisabled} />
                </Button>
            </footer>
        </form>
    );
}

function Review({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    const { previousStep } = useWizard();
    const { handleSubmit: handleSubmitWrapper } =
        useFormContext<CompanyAndLocation>();

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmitWrapper(handleSubmit)(e);
            }}
        >
            <header className="flex justify-between px-4">
                <h1>Review</h1>
                <Button variant="flatIcon" onClick={() => onClose()}>
                    <CrossMarkIcon />
                </Button>
            </header>
            <article className="mt-2 flex grow flex-wrap gap-4 overflow-y-auto px-4">
                <button
                    onClick={() => void handleSubmit(defaultCompanyAndLocation)}
                    disabled={isMutating}
                >
                    submit
                </button>
            </article>
            <footer className="mt-2 flex justify-between px-4">
                <Button onClick={() => previousStep()}>Previous</Button>
                <Button>
                    <input type="submit" value="Next" disabled={isMutating} />
                </Button>
            </footer>
        </form>
    );
}

export function CompanyCreationModal() {
    const methods = useForm({
        defaultValues: defaultCompanyAndLocation,
    });
    const { fields, append, remove } = useFieldArray({
        name: "location",
        control: methods.control,
    });

    const [isOpen, handleOpen] = useToggle();

    function onClose() {
        handleOpen(false);
    }

    return (
        <>
            <Button variant="flatIcon" onClick={() => handleOpen(true)}>
                <AddIcon />
            </Button>
            {isOpen && (
                <Dialog onClick={onClose}>
                    <div
                        className="max-h-screen  rounded-lg border border-slate-200 bg-white py-2 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:max-w-[50%]"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <FormProvider {...methods}>
                            <Wizard>
                                <CompanyCreationForm onClose={onClose} />
                                {fields.map((field, index) => (
                                    <LocationCreationForm
                                        key={field.id}
                                        index={index}
                                        onClose={onClose}
                                        onLocationAdd={() =>
                                            append(defaultLocation)
                                        }
                                        onLocationRemove={
                                            fields.length > 1
                                                ? () => remove(index)
                                                : undefined
                                        }
                                    />
                                ))}
                                <Review onClose={onClose} />
                            </Wizard>
                        </FormProvider>
                    </div>
                </Dialog>
            )}
        </>
    );
}

