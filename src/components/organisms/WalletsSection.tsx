import { Flex, Loader } from "@mantine/core";
import WalletItem from "components/molecules/WalletItem";
import { useWallets } from "hooks/useWallets";
import React, { useEffect, useState } from "react";
import { WalletProps } from "types/types";

const WalletsSection = () => {
    const { getWallets } = useWallets();
    const [wallets, setWallets] = useState<WalletProps[]>();

    useEffect(() => {
        (async () => {
            const wallets = await getWallets();
            setWallets(wallets);
        })()
    }, []);

    if (!wallets) {
        return (
            <Flex align='center' justify='center'><Loader size='lg' /></Flex>
        );
    } else {
        return (
            <>
                {wallets.map((item, index) => (<WalletItem key={index} wallet={item} />))}
            </>
        );
    }
}

export default WalletsSection;