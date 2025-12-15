import {apiRequest} from "./api";
import {apiRoutes} from "./routes";
import {UserRequest} from "../models/requests";
import {UserType} from "../models/types";
import authstore from "../utils/authstore";


export const register = async (data: UserRequest) =>
    apiRequest<UserRequest, UserType>("POST", `${apiRoutes.USERS}/register`, data);

export const login = async (data: UserRequest) =>
    apiRequest<UserRequest, UserType>("POST", `${apiRoutes.USERS}/login`, data);

export const signout = async () => {
    if(!authstore.user){
        return;
    }
    authstore.signout();
    await apiRequest<null, null>("POST", `${apiRoutes.USERS}/signout`);
}