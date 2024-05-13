import React from "react";

export const useDates = () => {
    const getFormatDate = (date: string) => {
        const date2 = new Date(date);

        return date2.toLocaleString();
    }

    return { getFormatDate };
}

//`${date2.getDate()}.${date2.getMonth()}.${date2.getFullYear()} ${date2.getHours()}:${date2.getMinutes()}`;