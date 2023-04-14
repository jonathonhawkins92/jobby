"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState, useTransition } from "react";
import type { PropsWithChildren, FormEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Company from "~/api/company";
import { defaultCompanyAndLocation } from "~/app/api/companyAndLocation/schema";
import type { CompanyAndLocation } from "~/app/api/companyAndLocation/schema";
import type { Location } from "~/app/api/location/schema";
import { Button } from "~/components/button";
import { Chip } from "~/components/chip";
import { Dialog, DialogClickBarrier } from "~/components/dialog";
import { Submit } from "~/components/form/input/submit";
import { Label } from "~/components/form/label";
import { AddIcon } from "~/components/icons/add";
import { CrossMarkIcon } from "~/components/icons/cross-mark";
import { useToggle } from "~/hooks/useToggle";

import { Fields as CompanyFields } from "../company/index";
import { Form as LocationForm } from "../location/index";

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
					aria-label="A button that opens the Location creation modal"
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

export function Modal({ children }: PropsWithChildren) {
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
		await Company.postCompanyWithLocation(data);
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
				aria-label="A button that opens the Company and Location creation modal"
				disabled={isMutating}
				variant="flatIcon"
				onClick={() => setIsCompanyModalOpen(true)}
			>
				{children}
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
