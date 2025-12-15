import {UserType} from "./types";

export interface UserRequest {
    username: string;
    password: string;
}

export interface ActivityRequest {
    name: string;
    description: string;
    time_created: number;
    duration: number;
    type: string;
    user: UserType;
}

export interface JournalRequest {
    content: string;
    date: number;
    user: UserType;
}