import React, { useCallback } from "react";
import axios from "axios";
import { API_URL, AssetCategoryEnum, AssetName, AssetProps, PagedResult } from "types/types";
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

    const getAssets = useCallback(async (pageSize: number, pageNumber: number, searchPhrase: string = '') => {
        try {
            const params = {
                currency: user?.currency,
                pageSize: pageSize,
                pageNumber: pageNumber,
                searchPhrase: searchPhrase
            }

            let result = await assetsAPI.get<PagedResult<AssetProps>>(`/asset`, { params: params });
            result.data.items.forEach(x => x.category = AssetCategoryEnum[x.category as keyof typeof AssetCategoryEnum]);

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const getAssetById = useCallback(async (assetId: number) => {
        try {
            let result = await assetsAPI.get<AssetProps>(`/asset/${user?.currency}/${assetId}`)
            result.data.category = AssetCategoryEnum[result.data.category as keyof typeof AssetCategoryEnum];

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, [])

    const getAssetNameslist = useCallback(async () => {
        try {
            let result = await assetsAPI.get<AssetName[]>(`/asset/${user?.currency}/namelist`);

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getAssets, getAssetById, getAssetNameslist };
};