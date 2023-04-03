"use client";

import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Button from "~/components/button";

type Location = {
    name: string;
    address: string;
    city: string;
    region: string;
    country: string;
};

const defaultLocation = {
    name: "",
    address: "",
    city: "",
    region: "",
    country: "",
};

type Company = {
    logo: string;
    name: string;
    description: string;
    about: string;
    industry: string;
    location: Location[];
};

const defaultCompany = {
    logo: "",
    name: "",
    description: "",
    about: "",
    industry: "",
    location: [defaultLocation],
};

export function CompanyForm() {
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
    const onSubmit: SubmitHandler<Company> = (data) => console.log(data);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
            }}
        >
            <input type="text" placeholder="Logo url" {...register("logo")} />
            <input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <textarea placeholder="description" {...register("description")} />
            <textarea placeholder="about" {...register("about")} />
            <input
                type="text"
                placeholder="industry"
                {...register("industry")}
            />
            {fields.map((field, index) => (
                <fieldset key={field.id}>
                    <legend>Locations</legend>
                    <input
                        type="text"
                        placeholder="name"
                        {...register(`location.${index}.name`, {
                            required: true,
                        })}
                        defaultValue={field.name}
                    />
                    <input
                        type="text"
                        placeholder="address"
                        {...register(`location.${index}.address`, {
                            required: true,
                        })}
                        defaultValue={field.address}
                    />
                    <input
                        type="text"
                        placeholder="city"
                        {...register(`location.${index}.city`, {
                            required: true,
                        })}
                        defaultValue={field.city}
                    />
                    <input
                        type="text"
                        placeholder="region"
                        {...register(`location.${index}.region`)}
                        defaultValue={field.region}
                    />
                    <input
                        type="text"
                        placeholder="country"
                        {...register(`location.${index}.country`, {
                            required: true,
                        })}
                        defaultValue={field.country}
                    />
                </fieldset>
            ))}
            <Button onClick={() => append(defaultLocation)}>+</Button>
            <Button onClick={() => remove(fields.length - 1)}>-</Button>
            <input type="submit" />
        </form>
    );
}

