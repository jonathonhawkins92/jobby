import type { Company } from "@prisma/client";

async function getCompanyData(id: string) {
    const res = await fetch(`http://localhost:3000/api/company/${id}`, {
        method: "GET",
        headers: {
            accepts: "application/json",
        },
    });

    return res.json() as Promise<Company>;
}

export default async function Company({ params }: { params: { id: string } }) {
    const data = await getCompanyData(params.id);

    return (
        <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
    );
}

