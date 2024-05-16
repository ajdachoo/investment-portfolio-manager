import { Button, Flex, Group, Loader } from "@mantine/core";
import WalletItem from "components/molecules/WalletItem";
import { useWallets } from "hooks/useWallets";
import React, { useEffect, useState } from "react";
import { WalletProps } from "types/types";
import CreateWalletFormModal from "./CreateWalletFormModal";
import { useDisclosure } from "@mantine/hooks";

const WalletsSection = () => {
    const { getWallets } = useWallets();
    const [wallets, setWallets] = useState<WalletProps[]>();
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        (async () => {
            const wallets = await getWallets();
            setWallets(wallets);
        })()
    }, [opened]);

    if (!wallets) {
        return (
            <Flex align='center' justify='center'><Loader size='lg' /></Flex>
        );
    } else {
        return (
            <Flex direction='column' justify='flex-start' w='100%' gap='md'>
                <Group>
                    <Button onClick={open}>Create new...</Button>
                </Group>
                <CreateWalletFormModal opened={opened} onClose={close} />
                <Flex wrap='wrap' gap='md'>
                    {wallets.map((item, index) => (<WalletItem key={index} wallet={item} />))}
                </Flex>
            </Flex>
        );
    }
}

export default WalletsSection;