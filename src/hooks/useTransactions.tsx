import React, { useCallback } from "react";
import axios from "axios";
import { API_URL, CreateTransactionProps, Transaction } from "types/types";
import { useAuth } from "./useAuth";

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
    const { user } = useAuth();

    const getTransactionsByAssetId = useCallback(async (walletId: number, assetId: number) => {
        try {
            let result = await transactionsAPI.get<Transaction[]>(`/wallet/${walletId}/transaction/${assetId}`);

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, [])

    const addTransaction = useCallback(async (walletId: number, transactionData: CreateTransactionProps) => {
        await transactionsAPI.post<CreateTransactionProps>(`/${user?.id}/wallet/${walletId}/transaction`, transactionData);
    }, [])

    const deleteTransaction = useCallback(async (walletId: number, transactionId: number) => {
        await transactionsAPI.delete(`/${user?.id}/wallet/${walletId}/transaction/${transactionId}`);
    }, [])

    return { getTransactionsByAssetId, addTransaction, deleteTransaction };
};