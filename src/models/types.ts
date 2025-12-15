

export type UserType = {
    id: number;
    username: string;
    password: string;
}

export type ActivityType = {
    id: number;
    name: string;
    description: string;
    time_created: number;
    duration: number;
    type: string;
    user: UserType;
}

export type JournalType = {
    id: number;
    content: string;
    date: number;
    user: UserType;
}