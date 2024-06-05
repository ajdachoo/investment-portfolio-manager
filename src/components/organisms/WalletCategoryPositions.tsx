import { Flex, NumberFormatter, Table, TextInput } from "@mantine/core";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletProps } from "types/types";
import classes from "assets/styles/Table.module.css";

interface WalletCategoryPositionsProps {
    wallet: WalletProps;
    handlerFetchData: () => Promise<void>;
}

const WalletCategoryPositions: FC<WalletCategoryPositionsProps> = ({ wallet, handlerFetchData }) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await handlerFetchData();
        })()
    }, []);

    return (
        <Flex direction='column' justify='flex-start' w='100%' gap='sm'>
            <TextInput onChange={(e) => setTimeout(() => setSearch(e.target.value), 500)} placeholder='Search...' />
            <Table className={classes.styledTable}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Percentage in wallet</Table.Th>
                        <Table.Th>Total value</Table.Th>
                        <Table.Th>Total profit</Table.Th>
                        <Table.Th>Total cost</Table.Th>
                        <Table.Th>%24h</Table.Th>
                        <Table.Th>%7d</Table.Th>
                        <Table.Th>%1m</Table.Th>
                        <Table.Th>%1y</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {wallet.assetCategoryPositions?.filter((item) => {
                        return search.toLowerCase() === '' ? item : item.categoryName.toLowerCase().includes(search.toLowerCase());
                    }).map((item, index) => (
                        <Table.Tr key={item.categoryId} onClick={() => navigate(`category/${item.categoryId}`)}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td>{item.categoryName}</Table.Td>
                            <Table.Td><NumberFormatter value={item.percentageInWallet} suffix={` %`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                            <Table.Td><NumberFormatter value={item.totalValue} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                            <Table.Td><PriceChangeFormatter size='sm' value={item.totalProfit} currency={wallet.currency} /></Table.Td>
                            <Table.Td><NumberFormatter value={item.totalCost} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                            <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange24h} /></Table.Td>
                            <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange7d} /></Table.Td>
                            <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange1m} /></Table.Td>
                            <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange1y} /></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Flex>
    );
};

export default WalletCategoryPositions;