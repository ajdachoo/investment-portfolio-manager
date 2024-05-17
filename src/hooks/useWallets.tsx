import React, { useCallback } from "react";
import axios from "axios";
import { API_URL, AssetCategoryEnum, CreateWalletProps, WalletProps } from "types/types";
import { useAuth } from "./useAuth";

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
    const { user } = useAuth();

    const getWallets = useCallback(async () => {
        try {
            let result = await walletsAPI.get<WalletProps[]>(`/wallet`);
            result.data.forEach((x) => {
                x.assetCategoryPositions.forEach(c => c.categoryName = AssetCategoryEnum[c.categoryName as keyof typeof AssetCategoryEnum]);
                x.assetPositions.forEach(p => p.assetCategoryName = AssetCategoryEnum[p.assetCategoryName as keyof typeof AssetCategoryEnum]);
            });

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const getWalletById = useCallback(async (id: number) => {
        try {
            let result = await walletsAPI.get<WalletProps>(`/wallet/${id}`);
            result.data.assetCategoryPositions.forEach(c => c.categoryName = AssetCategoryEnum[c.categoryName as keyof typeof AssetCategoryEnum]);

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, [])

    const createWallet = useCallback(async (walletData: CreateWalletProps) => {
        await walletsAPI.post(`/${user?.id}/wallet`, walletData);
    }, [])

    const deleteWallet = useCallback(async (walletId: number) => {
        await walletsAPI.delete(`/${user?.id}/wallet/${walletId}`);
    }, [])

    return { getWallets, getWalletById, createWallet, deleteWallet };
};