"use client";

import { Button } from "~/components/button";
import { Dialog, DialogClickBarrier } from "~/components/dialog";
import { useToggle } from "~/hooks/useToggle";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import type { PropsWithChildren } from "react";
import { TextInput } from "~/components/form/input/text";
import { TextareaInput } from "~/components/form/input/textarea";
import { Label } from "~/components/form/label";
import { CrossMarkIcon } from "~/components/icons/cross-mark";
import { defaultCompany } from "~/app/api/company/schema";
import type { Company as CompanyModel } from "~/app/api/company/schema";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Submit } from "~/components/form/input/submit";
import Company from "~/api/company";

export function Fields({ isDisabled }: { isDisabled: boolean }) {
    const {
        register,
        formState: { errors },
        setFocus,
    } = useFormContext<CompanyModel>();

    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    return (
        <>
            <Label htmlFor="name">Name</Label>
            <TextInput
                id="name"
                placeholder="The name of the company"
                {...register("name", {
                    required: true,
                    disabled: isDisabled,
                })}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <Label htmlFor="logo">Logo</Label>
            <TextInput
                id="logo"
                placeholder="The URL to the companies logo"
                {...register("logo", {
                    disabled: isDisabled,
                })}
            />
            <Label htmlFor="description">Description</Label>
            <TextareaInput
                id="description"
                placeholder="A short description of the company"
                {...register("description", {
                    required: true,
                    disabled: isDisabled,
                })}
            />
            <Label htmlFor="about">About</Label>
            <TextareaInput
                id="about"
                placeholder="A long description of the company"
                {...register("about", {
                    required: true,
                    disabled: isDisabled,
                })}
            />
            <Label htmlFor="industry">Industry</Label>
            <TextInput
                id="industry"
                placeholder="What is the companies specialty?"
                {...register("industry", {
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
    titleText = "Create Company",
    submitButtonText = "Create",
    name,
    logo,
    description,
    about,
    industry,
}: {
    onClose: () => void;
    isDisabled?: boolean;
    onSubmit: (company: CompanyModel) => void;
    titleText?: string;
    submitButtonText?: string;
} & Partial<CompanyModel>) {
    const methods = useForm<CompanyModel>({
        defaultValues: {
            ...defaultCompany,
            name,
            logo,
            description,
            about,
            industry,
        },
    });

    return (
        <form
            className="flex max-h-screen flex-col p-2"
            onSubmit={(e) => {
                e.preventDefault();
                void methods.handleSubmit(onSubmit)(e);
            }}
        >
            <header className="flex justify-between p-2">
                <h1>{titleText}</h1>
                <Button variant="flatIcon" onClick={() => onClose()}>
                    <CrossMarkIcon />
                </Button>
            </header>
            <article className="flex grow flex-wrap gap-4 overflow-y-auto p-2">
                <FormProvider {...methods}>
                    <Fields isDisabled={isDisabled} />
                </FormProvider>
            </article>
            <footer className="flex justify-end p-2">
                <Submit value={submitButtonText} disabled={isDisabled} />
            </footer>
        </form>
    );
}

export function Modal({
    children,
    name,
    logo,
    description,
    about,
    industry,
    id,
}: PropsWithChildren<
    {
        id?: string;
    } & Partial<CompanyModel>
>) {
    const [isOpen, handleOpen] = useToggle();

    function onClose() {
        handleOpen(false);
    }

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    async function handleSubmit(data: CompanyModel) {
        setIsFetching(true);
        if (id) {
            await Company.putCompany(id, data);
        } else {
            await Company.postCompany(data);
        }
        setIsFetching(false);

        startTransition(() => {
            router.refresh();
        });

        onClose();
    }

    const isMutating = isFetching || isPending;

    return (
        <>
            <Button
                aria-label="A button that opens the Company creation modal"
                variant="flatIcon"
                onClick={() => handleOpen(true)}
            >
                {children}
            </Button>
            {isOpen && (
                <Dialog onMouseDown={onClose} onTouchStart={onClose}>
                    <DialogClickBarrier className="rounded-md border-2 border-purple-300 bg-white shadow-md shadow-purple-300/90 dark:border-blue-300/40 dark:bg-slate-900 dark:text-white dark:shadow-blue-300/40 sm:max-w-[50%]">
                        <Form
                            onClose={onClose}
                            isDisabled={isMutating}
                            onSubmit={(company) => void handleSubmit(company)}
                            name={name}
                            logo={logo}
                            description={description}
                            about={about}
                            industry={industry}
                            titleText={id ? "Edit Company" : "New Company"}
                            submitButtonText={id ? "Update" : "Create"}
                        />
                    </DialogClickBarrier>
                </Dialog>
            )}
        </>
    );
}

