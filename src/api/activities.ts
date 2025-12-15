import {ActivityType} from "../models/types";
import {apiRequest} from "./api";
import {apiRoutes} from "./routes";
import {ActivityRequest} from "../models/requests";


export const getAllForDate = async (id: number, start: number, end: number) =>
    apiRequest<null, ActivityType[]>("GET", `${apiRoutes.ACTIVITIES}/${id}/${start}/${end}`);

export const create = async (data: ActivityRequest) =>
    apiRequest<ActivityRequest, ActivityType>("POST", apiRoutes.ACTIVITIES, data);

export const remove = async (id: number) =>
    apiRequest<null, ActivityType>("DELETE", `${apiRoutes.ACTIVITIES}/${id}`);