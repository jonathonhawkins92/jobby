"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import type { Location } from "~/app/api/location/schema";
import { defaultLocation } from "~/app/api/location/schema";
import { Button } from "~/components/button";
import { Dialog } from "~/components/dialog";
import { Submit } from "~/components/form/input/submit";
import { TextInput } from "~/components/form/input/text";
import { Label } from "~/components/form/label";
import { CrossMarkIcon } from "~/components/icons/cross-mark";
import { useToggle } from "~/hooks/useToggle";

export function Fields({ isDisabled }: { isDisabled: boolean }) {
	const { register, setFocus } = useFormContext<Location>();

	useEffect(() => {
		setFocus("name");
	}, [setFocus]);

	return (
		<>
			<Label htmlFor="name">Name</Label>
			<TextInput
				placeholder="The name of the location"
				title="The name of the location"
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
				{...register("region", {
					disabled: isDisabled,
				})}
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
			className="border-common flex max-h-screen flex-col"
			onSubmit={(event) => {
				event.preventDefault();
				void methods.handleSubmit(onSubmit)(event);
			}}
		>
			<header className="border-common-color flex items-end justify-between border-b-[1px] p-4">
				<h1>Location</h1>
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
					<Fields isDisabled={isDisabled} />
				</FormProvider>
			</article>
			<footer className="border-common-color flex justify-end border-t-[1px] p-4">
				<Submit
					value={submitButtonText}
					disabled={isDisabled}
				/>
			</footer>
		</form>
	);
}

export function Modal({
	ExternalButton = Button,
}: {
	ExternalButton?: typeof Button;
}) {
	const [isLocationModalOpen, setIsLocationModalOpen] = useToggle();

	function onLocationModalClose() {
		setIsLocationModalOpen(false);
	}

	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);

	async function handleSubmit(data: Location) {
		setIsFetching(true);
		// TODO: implement the API
		await fetch("/api/location", {
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

		onLocationModalClose();
	}

	const isMutating = isFetching || isPending;

	function stopPropagation(e: { stopPropagation: () => void }) {
		e.stopPropagation();
	}

	return (
		<>
			<ExternalButton
				aria-label="A button that opens the Location creation modal"
				disabled={isMutating}
				onClick={() => setIsLocationModalOpen(true)}
			/>
			{isLocationModalOpen && (
				<Dialog
					onMouseDown={onLocationModalClose}
					onTouchStart={onLocationModalClose}
				>
					<div
						className="rounded-md border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:max-w-[50%]"
						onMouseDown={stopPropagation}
						onTouchStart={stopPropagation}
					>
						<Form
							onClose={onLocationModalClose}
							isDisabled={isMutating}
							onSubmit={(location) => void handleSubmit(location)}
						/>
					</div>
				</Dialog>
			)}
		</>
	);
}
