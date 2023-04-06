"use client";

import { Button } from "~/components/button";
import { Dialog } from "~/components/dialog";
import { AddIcon } from "~/components/icons/add";
import { useToggle } from "~/hooks/useToggle";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { TextInput } from "~/components/form/input/text";
import { TextareaInput } from "~/components/form/input/textarea";
import { Label } from "~/components/form/label";
import { CrossMarkIcon } from "~/components/icons/crossMark";
import { defaultCompany } from "~/app/api/company/model";
import type { Company } from "~/app/api/company/model";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Submit } from "~/components/form/input/submit";

export function Fields({ isDisabled }: { isDisabled: boolean }) {
    const {
        register,
        formState: { errors },
        setFocus,
    } = useFormContext<Company>();

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
    submitButtonText = "Create",
}: {
    onClose: () => void;
    isDisabled?: boolean;
    onSubmit: (company: Company) => void;
    submitButtonText?: string;
}) {
    const methods = useForm<Company>({
        defaultValues: defaultCompany,
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
                <h1>New Company</h1>
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

export function Modal() {
    const [isOpen, handleOpen] = useToggle();

    function onClose() {
        handleOpen(false);
    }

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    async function handleSubmit(data: Company) {
        setIsFetching(true);
        await fetch("/api/company", {
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
                            onSubmit={(company) => void handleSubmit(company)}
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}

