import type {
    GetCompanyByIdData,
    PutCompanyByIdData,
} from "~/app/api/company/[id]/db";
import type { GetOverviewData } from "~/app/api/company/overview/db";
import type { GetIdData } from "~/app/api/company/id/db";
import type { PostCompanyByIdData } from "~/app/api/company/db";
import type { Company } from "~/app/api/company/schema";
import type { PostCompanyAndLocation } from "~/app/api/companyAndLocation/db";
import type { CompanyAndLocation } from "~/app/api/companyAndLocation/schema";
import BaseAPI from "./base";

class API extends BaseAPI {
    static instance: API = new API();

    async getIds() {
        const { error, success } = await this.fetch<GetIdData>("/company/id");
        if (error) {
            throw new Error("Error getting company ids");
        }
        if (!success?.data) {
            return [];
        }
        return success.data;
    }

    async getOverview() {
        const { error, success } = await this.fetch<GetOverviewData>(
            "/company/overview"
        );
        if (error) {
            throw new Error("Error getting company overview");
        }
        if (!success?.data) {
            return [];
        }
        return success.data;
    }

    async getCompanyById(id: string) {
        const { error, success } = await this.fetch<GetCompanyByIdData>(
            `/company/${id}`
        );
        if (error) {
            throw new Error("Error getting company by id");
        }
        if (!success?.data) {
            return undefined;
        }
        return success.data;
    }

    async putCompany(id: string, data: Company) {
        const { error, success } = await this.fetch<PutCompanyByIdData>(
            `/company/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if (error) {
            throw new Error("Error updating company");
        }
        if (!success?.data) {
            return undefined;
        }
        return success.data;
    }

    async postCompany(data: Company) {
        const { error, success } = await this.fetch<PostCompanyByIdData>(
            "/company",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if (error) {
            throw new Error("Error creating company");
        }
        if (!success?.data) {
            return undefined;
        }
        return success.data;
    }

    async postCompanyWithLocation(data: CompanyAndLocation) {
        const { error, success } = await this.fetch<PostCompanyAndLocation>(
            "/companyAndLocation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if (error) {
            throw new Error("Error creating company with location");
        }
        if (!success?.data) {
            return undefined;
        }
        return success.data;
    }
}

export default API.instance;

