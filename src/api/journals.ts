import {JournalType} from "../models/types";
import {apiRequest} from "./api";
import {apiRoutes} from "./routes";
import {JournalRequest} from "../models/requests";


export const getJournal = async (id: number, start: number, end: number) =>
    apiRequest<null, JournalType>("GET", `${apiRoutes.JOURNALS}/${id}/${start}/${end}`);

export const updateJournal = async (id: number, data: JournalRequest) =>
    apiRequest<JournalRequest, JournalType>("PATCH", `${apiRoutes.JOURNALS}/${id}`, data);