import React from "react";

export const useDates = () => {
    const getFormatDate = (date: string, type: 'long' | 'short') => {
        const date2 = new Date(date);

        if (type === 'long') {
            return date2.toLocaleString();
        }
        else {
            return date2.toLocaleDateString();
        }

    }

    return { getFormatDate };
}

//`${date2.getDate()}.${date2.getMonth()}.${date2.getFullYear()} ${date2.getHours()}:${date2.getMinutes()}`;