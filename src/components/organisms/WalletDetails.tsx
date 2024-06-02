import { Button, Flex, Group, Loader, NumberFormatter, Table, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import { useWallets } from "hooks/useWallets";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WalletProps } from "types/types";
import CreateTransactionFormModal from "./CreateTransactionFormModal";

const WalletDetails = () => {
    const { getWalletById, deleteWallet } = useWallets();
    const [opened, { open, close }] = useDisclosure(false);
    const [wallet, setWallet] = useState<WalletProps>();
    const [search, setSearch] = useState('');
    const { walletId } = useParams();
    const navigate = useNavigate()

    const handleOnDelete = async () => {
        await deleteWallet(Number.parseInt(walletId as string));
        navigate('/wallets');
    }

    useEffect(() => {
        (async () => {
            const wallet = await getWalletById(Number.parseInt(walletId as string));
            setWallet(wallet);
        })()
    }, [walletId, opened]);

    if (!wallet) {
        return (
            <Flex align='center' justify='center'><Loader size='lg' /></Flex>
        );
    } else {
        return (
            <Flex direction='column' justify='flex-start' w='100%' gap='sm'>
                <Group justify='space-between'>
                    <Button onClick={open}>+ Add transaction</Button>
                    <Button color={'red'} onClick={handleOnDelete}>Delete wallet</Button>
                </Group>
                <CreateTransactionFormModal opened={opened} onClose={close} wallet={wallet} />
                <TextInput onChange={(e) => setTimeout(() => setSearch(e.target.value), 500)} placeholder='Search...' />
                <Table>
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
    }
}

export default WalletDetails;