import { Button, Flex, Loader, NumberFormatter, Table, TextInput, UnstyledButton, rem } from "@mantine/core";
import { TrashIcon } from "assets/icons/trashIcon";
import { useDates } from "hooks/useDates";
import { useTransactions } from "hooks/useTransactions";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Transaction, TransactionEnum } from "types/types";
import classes from "./WalletTransactions.module.css";

const getTransactionTypeColor = (type: string) => {
    if (type == 'Buy') {
        return 'green';
    } else {
        return 'red';
    }
}

const WalletTransactions = () => {
    const { getTransactionsByAssetId, deleteTransaction } = useTransactions();
    const [transactions, setTransactions] = useState<Transaction[]>();
    const [search, setSearch] = useState('');
    const { walletId, assetId } = useParams();
    const { getFormatDate } = useDates();
    const navigate = useNavigate();

    const handleDeleteButton = async (transactionId: number) => {
        await deleteTransaction(Number.parseInt(walletId as string), transactionId);
    }

    useEffect(() => {
        (async () => {
            const transactions = await getTransactionsByAssetId(Number.parseInt(walletId as string), Number.parseInt(assetId as string));
            setTransactions(transactions)
        })()
    }, [walletId, assetId, handleDeleteButton]);

    if (!transactions) {
        return (
            <Flex align='center' justify='center'><Loader size='lg' /></Flex>
        );
    } else {
        return (
            <Flex direction='column' justify='flex-start' w='100%' gap='sm'>
                <TextInput onChange={(e) => setTimeout(() => setSearch(e.target.value), 500)} placeholder='Search...' />
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Initial value</Table.Th>
                            <Table.Th>Transaction date</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {transactions.filter((item) => {
                            return search.toLowerCase() === '' ? item : `${getFormatDate(item.transactionDate)} ${item.type}`.toLowerCase().includes(search.toLowerCase());
                        }).map((item, index) => (
                            <Table.Tr key={item.id}>
                                <Table.Td>{index + 1}</Table.Td>
                                <Table.Td c={getTransactionTypeColor(item.type.toString())}>{item.type}</Table.Td>
                                <Table.Td><NumberFormatter value={item.price} suffix={` ${item.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td>{item.quantity}</Table.Td>
                                <Table.Td><NumberFormatter value={item.initialValue} suffix={` ${item.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td>{getFormatDate(item.transactionDate)}</Table.Td>
                                <Table.Td><UnstyledButton onClick={() => handleDeleteButton(item.id)} className={classes.trashButton}><TrashIcon style={{ width: rem(20), height: rem(20) }} /></UnstyledButton></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Flex>
        );
    }
};

export default WalletTransactions;