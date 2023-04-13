import Company from "~/api/company";

export default async function CompanyPage({
    params,
}: {
    params: { id: string };
}) {
    const data = await Company.getCompanyById(params.id);

    return (
        <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
    );
}

