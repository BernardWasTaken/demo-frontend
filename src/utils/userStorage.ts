import {UserType} from "../models/types";


const user_prefix = "user";
const token_prefix = "token";

const userStorage = {
    getUser: (): UserType => {
        if (typeof window === "undefined") return {} as UserType;
        return JSON.parse(
            window.localStorage.getItem(`${user_prefix}`) as string,
        ) as UserType;
    },
    setUser: (user: UserType): void => {
        window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user));
    },
    clearUser: (): void => {
        window.localStorage.removeItem(`${user_prefix}`);
    },
    getToken: (): string => {
        if (typeof window === "undefined") return {} as string;
        return JSON.parse(
            window.localStorage.getItem(`${token_prefix}`) as string,
        ) as string;
    },
    setToken: (token: string): void => {
        window.localStorage.setItem(`${token_prefix}`, JSON.stringify(token));
    },
    clearToken: (): void => {
        window.localStorage.removeItem(`${token_prefix}`);
    }
};

export { userStorage };