import { Button, Flex, Group, Loader, NumberFormatter, Table, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import { useWallets } from "hooks/useWallets";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { WalletProps } from "types/types";
import CreateTransactionFormModal from "./CreateTransactionFormModal";
import WalletPositions from "./WalletPositions";
import WalletTransactions from "./WalletTransactions";
import WalletCategoryPositions from "./WalletCategoryPositions";

const WalletDetails = () => {
    const { getWalletById, deleteWallet } = useWallets();
    const [opened, { open, close }] = useDisclosure(false);
    const [wallet, setWallet] = useState<WalletProps>();
    const { walletId } = useParams();
    const navigate = useNavigate()

    const handleOnDelete = async () => {
        await deleteWallet(Number.parseInt(walletId as string));
        navigate('/wallets');
    }

    const fetchData = async () => {
        const wallet = await getWalletById(Number.parseInt(walletId as string));
        setWallet(wallet);
    }

    useEffect(() => {
        (async () => {
            await fetchData();
        })()
    }, [opened]);

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
                <Routes>
                    <Route path='/' element={<WalletCategoryPositions wallet={wallet} handlerFetchData={fetchData} />} />
                    <Route path='/category/:categoryId' element={<WalletPositions wallet={wallet} handlerFetchData={fetchData} />} />
                    <Route path='/category/:categoryId/transaction/:assetId' element={<WalletTransactions />} />
                </Routes>
            </Flex>
        );
    }
}

export default WalletDetails;