import { Flex, Loader, NumberFormatter, Table, TextInput } from "@mantine/core";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import { useWallets } from "hooks/useWallets";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WalletProps } from "types/types";

const WalletPositions = () => {
    const { getWalletById } = useWallets();
    const [wallet, setWallet] = useState<WalletProps>();
    const [search, setSearch] = useState('');
    const { walletId, categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const wallet = await getWalletById(Number.parseInt(walletId as string));
            setWallet(wallet);
        })()
    }, [walletId]);

    if (!wallet) {
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
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Ticker</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Total value</Table.Th>
                            <Table.Th>Total cost</Table.Th>
                            <Table.Th>Average cost</Table.Th>
                            <Table.Th>Profit</Table.Th>
                            <Table.Th>Percentage in wallet</Table.Th>
                            <Table.Th>%24h</Table.Th>
                            <Table.Th>%7d</Table.Th>
                            <Table.Th>%1m</Table.Th>
                            <Table.Th>%1y</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {wallet.assetPositions?.filter((item) => item.assetCategoryId === Number.parseInt(categoryId as string)).filter((item) => {
                            return search.toLowerCase() === '' ? item : `${item.assetName} ${item.ticker}`.toLowerCase().includes(search.toLowerCase());
                        }).map((item, index) => (
                            <Table.Tr key={item.assetId} onClick={() => navigate(`transaction/${item.assetId}`)}>
                                <Table.Td>{index + 1}</Table.Td>
                                <Table.Td>{item.assetName}</Table.Td>
                                <Table.Td>{item.ticker}</Table.Td>
                                <Table.Td>{item.quantity}</Table.Td>
                                <Table.Td><NumberFormatter value={item.price} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td><NumberFormatter value={item.totalValue} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td><NumberFormatter value={item.totalCost} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td><NumberFormatter value={item.avgCost} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td><PriceChangeFormatter size='sm' value={item.profit} currency={wallet.currency} /></Table.Td>
                                <Table.Td><NumberFormatter value={item.percentageInWallet} suffix={` %`} decimalScale={2} thousandSeparator=',' /></Table.Td>
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
    }
}

export default WalletPositions;