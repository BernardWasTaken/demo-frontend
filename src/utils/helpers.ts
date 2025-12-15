
export const msToDate = (ms: number) => {
    const date = new Date(ms);
    return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
}

export const getStartEndDate = (time: number) => {
    const date = new Date(time);
    const start = (date.getUTCFullYear() - 1970) * 31557600000 + (date.getUTCMonth()) * 2629800000 + (date.getUTCDate()-1) * 86400000;
    return `${start - 5400000 - 43200000}.${start - 5400000 - 43200000 + 86399999}`;
}

export const msToMinutes = (ms: number) => {
    return Math.floor(ms / 60000);
}

export const minutesToMs = (minutes: number) => {
    return minutes * 60000;
}