import React, { useCallback } from "react";
import axios from "axios";
import { API_URL, AssetCategoryEnum, AssetProps } from "types/types";
import { useAuth } from "./useAuth";

const assetsAPI = axios.create({});

assetsAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.baseURL = API_URL;
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const useAssets = () => {
    const { user } = useAuth()

    const getAssets = useCallback(async () => {
        try {
            let result = await assetsAPI.get<AssetProps[]>(`/asset/${user?.currency}`);
            result.data.forEach(x => x.category = AssetCategoryEnum[x.category as keyof typeof AssetCategoryEnum]);

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getAssets };
};