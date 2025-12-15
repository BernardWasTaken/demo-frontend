import Axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";
import authStore from "../utils/authstore";
import authstore from "../utils/authstore";

export async function apiRequest<Body = Record<string, unknown>, R = unknown>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: Body,
    options? : {
        headers?: AxiosRequestHeaders;
    } & AxiosRequestConfig,
) {
    try{
        const headers: Record<string, string> = {
            ...(options?.headers as Record<string, string>),
        };

        if(authstore.token){
            headers['Authorization'] = `Bearer ${authstore.token}`;
        }

        return await Axios.request<R>({
            baseURL: process.env.REACT_APP_API_URL,
            url: path,
            method: method,
            data: body,
            headers: headers,
            withCredentials: true,
        });
    } catch(error: any){
        return error.response;
    }
}