import React, { useCallback } from "react";
import axios from "axios";
import { API_URL, Transaction } from "types/types";

const transactionsAPI = axios.create({});

transactionsAPI.interceptors.request.use(
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

export const useTransactions = () => {

    const getTransactionsByAssetId = useCallback(async (walletId: number, assetId: number) => {
        try {
            let result = await transactionsAPI.get<Transaction[]>(`/wallet/${walletId}/transaction/${assetId}`);

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, [])

    return { getTransactionsByAssetId };
};