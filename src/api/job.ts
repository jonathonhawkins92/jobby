import type { GetIdData } from "~/app/api/job/id/db";
import type { GetOverviewData } from "~/app/api/job/overview/db";
import BaseAPI from "./base";

class API extends BaseAPI {
    static instance: API = new API();

    async getIds() {
        const { error, success } = await this.fetch<GetIdData>("/job/id");
        if (error) {
            throw new Error("Error getting job ids");
        }
        if (!success?.data) {
            return [];
        }
        return success.data;
    }

    async getOverview() {
        const { error, success } = await this.fetch<GetOverviewData>(
            "/job/overview"
        );
        if (error) {
            throw new Error("Error getting jobs overview");
        }
        if (!success?.data) {
            return [];
        }
        return success.data;
    }
}

export default API.instance;

