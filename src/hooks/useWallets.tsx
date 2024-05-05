import React, { useCallback } from "react";
import axios from "axios";
import { API_URL, AssetCategoryEnum, WalletProps } from "types/types";

const walletsAPI = axios.create({});

walletsAPI.interceptors.request.use(
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

export const useWallets = () => {

    const getWallets = useCallback(async () => {
        try {
            let result = await walletsAPI.get<WalletProps[]>(`/wallet`);
            result.data.forEach(x => x.assetCategoryPositions.forEach(c => c.categoryName = AssetCategoryEnum[c.categoryName as keyof typeof AssetCategoryEnum]));

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getWallets };
};