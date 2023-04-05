"use client";

import { Button } from "~/components/button";
import { Dialog } from "~/components/dialog";
import { AddIcon } from "~/components/icons/add";
import { useToggle } from "~/hooks/useToggle";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TextInput } from "~/components/form/input/text";
import { TextareaInput } from "~/components/form/input/textarea";
import { Label } from "~/components/form/label";
import { Radio } from "~/components/form/input/radio";

type Location = {
    name?: string;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    isPrimary?: boolean;
};

const defaultLocation = {
    name: undefined,
    address: undefined,
    city: undefined,
    region: undefined,
    country: undefined,
    isPrimary: false,
};

type Company = {
    logo?: string;
    name?: string;
    description?: string;
    about?: string;
    industry?: string;
    location?: Location[];
};

const defaultCompany = {
    logo: undefined,
    name: undefined,
    description: undefined,
    about: undefined,
    industry: undefined,
    location: [defaultLocation],
};

export function CompanyCreationModal() {
    const [isOpen, handleOpen] = useToggle();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    // Create inline loading UI
    const isMutating = isFetching || isPending;

    async function onSubmit(data: Company) {
        setIsFetching(true);
        // Mutate external data source
        const res = await fetch("/api/company", {
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
        if (res.status >= 200 || res.status < 300) {
            handleOpen(false);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<Company>({
        defaultValues: defaultCompany,
    });
    const { fields, append, remove } = useFieldArray({
        name: "location",
        control,
    });

    return (
        <>
            <Button variant="flatIcon" onClick={() => handleOpen(true)}>
                <AddIcon />
            </Button>
            {isOpen && (
                <Dialog onBackdropClick={() => handleOpen(false)}>
                    <form
                        className="w-full rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            void handleSubmit(onSubmit)(e);
                        }}
                    >
                        <header className="flex justify-between px-4 py-2">
                            <h1>New Company</h1>
                            <Button onClick={() => handleOpen(false)}>
                                &times;
                            </Button>
                        </header>
                        <article className="flex flex-wrap gap-4">
                            <fieldset>
                                <h1 className="text-left text-lg">Company</h1>
                                <Label htmlFor="name">Name</Label>
                                <TextInput
                                    id="name"
                                    placeholder="name"
                                    {...register("name", {
                                        required: true,
                                        disabled: isMutating,
                                    })}
                                />
                                {errors.name && (
                                    <span>{errors.name.message}</span>
                                )}
                                <Label htmlFor="logo">Logo</Label>
                                <TextInput
                                    id="logo"
                                    placeholder="Logo url"
                                    {...register("logo")}
                                />
                                <Label htmlFor="description">Description</Label>
                                <TextareaInput
                                    id="description"
                                    placeholder="Description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                />
                                <Label htmlFor="about">About</Label>
                                <TextareaInput
                                    id="about"
                                    placeholder="About"
                                    {...register("about", {
                                        required: true,
                                    })}
                                />
                                <Label htmlFor="industry">Industry</Label>
                                <TextInput
                                    id="industry"
                                    placeholder="industry"
                                    {...register("industry", {
                                        required: true,
                                    })}
                                />
                            </fieldset>
                            {fields.map((field, index) => (
                                <fieldset key={field.id}>
                                    <h3 className="text-left text-base">
                                        Location {index + 1}
                                    </h3>
                                    <Label htmlFor="name">Name</Label>
                                    <TextInput
                                        placeholder="name"
                                        {...register(`location.${index}.name`, {
                                            required: false,
                                        })}
                                        defaultValue={field.name}
                                    />
                                    <Label htmlFor="address">Address</Label>
                                    <TextInput
                                        placeholder="address"
                                        {...register(
                                            `location.${index}.address`,
                                            {
                                                required: true,
                                            }
                                        )}
                                        defaultValue={field.address}
                                    />
                                    <Label htmlFor="city">City</Label>
                                    <TextInput
                                        placeholder="city"
                                        {...register(`location.${index}.city`, {
                                            required: true,
                                        })}
                                        defaultValue={field.city}
                                    />
                                    <Label htmlFor="region">Region</Label>
                                    <TextInput
                                        placeholder="region"
                                        {...register(
                                            `location.${index}.region`
                                        )}
                                        defaultValue={field.region}
                                    />
                                    <Label htmlFor="country">Country</Label>
                                    <TextInput
                                        placeholder="country"
                                        {...register(
                                            `location.${index}.country`,
                                            {
                                                required: true,
                                            }
                                        )}
                                        defaultValue={field.country}
                                    />
                                    <Label className="flex justify-between">
                                        Is primary location
                                    </Label>
                                    <Radio
                                        placeholder="isPrimary"
                                        {...register(
                                            `location.${index}.isPrimary`
                                        )}
                                        name="isPrimary"
                                        defaultChecked={field.isPrimary}
                                    />
                                </fieldset>
                            ))}
                        </article>
                        <footer className="flex justify-between px-4 py-2">
                            <Button
                                onClick={() => {
                                    if (fields.length === 1) return;
                                    remove(fields.length - 1);
                                }}
                            >
                                -
                            </Button>
                            <Button onClick={() => append(defaultLocation)}>
                                +
                            </Button>
                            <Button>
                                <input type="submit" />
                            </Button>
                        </footer>
                    </form>
                </Dialog>
            )}
        </>
    );
}

