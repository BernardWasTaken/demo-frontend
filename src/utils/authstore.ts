import {UserType} from "../models/types";
import {userStorage} from "./userStorage";
import {makeAutoObservable} from "mobx";


class AuthStore {
    user?: UserType | null = userStorage.getUser() || null;
    token?: string | null = userStorage.getToken() || null;

    constructor() {
        makeAutoObservable(this);
    }

    login(user: UserType, token: string) {
        userStorage.setUser(user);
        this.user = user;
        userStorage.setToken(token);
        this.token = token;
    }

    signout() {
        userStorage.clearUser();
        this.user = undefined;
    }

    update(user: UserType, token: string) {
        userStorage.setUser(user);
        this.user = user;
        userStorage.setToken(token);
        this.token = token;
    }
}

const authStore = new AuthStore();
export default authStore;