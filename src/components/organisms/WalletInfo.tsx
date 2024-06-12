import { Flex, NumberFormatter, Text } from "@mantine/core";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import WalletInfoItem from "components/molecules/WalletInfoItem";
import { useDates } from "hooks/useDates";
import React, { FC } from "react";
import { WalletProps } from "types/types";

interface WalletInfoProps {
    wallet: WalletProps;
}

const WalletInfo: FC<WalletInfoProps> = ({ wallet }) => {
    const { getFormatDate } = useDates();

    return (
        <Flex gap='md' wrap='wrap'>
            <WalletInfoItem label={wallet.details}>
                <Text fw={500}>{wallet.name}</Text>
            </WalletInfoItem>
            <WalletInfoItem label="Last transaction date">
                {getFormatDate(wallet.updatedDate, 'short')}
            </WalletInfoItem>
            <WalletInfoItem label="Current Balance">
                <NumberFormatter value={wallet.currentValue} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' />
            </WalletInfoItem>
            <WalletInfoItem label="Total Cost">
                <NumberFormatter value={wallet.totalCost} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' />
            </WalletInfoItem>
            <WalletInfoItem label="Total Profit/Loss">
                <PriceChangeFormatter size='md' value={wallet.totalProfit} currency={wallet.currency} />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 24h">
                <PercentageChangeFormatter value={wallet.percentageChange24h} size="md" />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 7d">
                <PercentageChangeFormatter value={wallet.percentageChange7d} size="md" />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 1m">
                <PercentageChangeFormatter value={wallet.percentageChange1m} size="md" />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 1y">
                <PercentageChangeFormatter value={wallet.percentageChange1y} size="md" />
            </WalletInfoItem>
        </Flex>
    );
};

export default WalletInfo;

/*

<Flex direction='column' wrap='wrap' align='start' w='100%'>
                            <Text size='md'>Current Balance: <NumberFormatter value={currentValue} suffix={` ${currency}`} decimalScale={2} thousandSeparator=',' /></Text>
                            <Text display='inline-flex' size='md'>Total Profit/Loss: <PriceChangeFormatter size='md' value={totalProfit} currency={currency} /></Text>
                            <Text size='md'>Total Cost: <NumberFormatter value={totalCost} suffix={` ${currency}`} decimalScale={2} thousandSeparator=',' /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 24h: <PercentageChangeFormatter value={percentageChange24h} size="md" /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 7d: <PercentageChangeFormatter value={percentageChange7d} size="md" /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 1m: <PercentageChangeFormatter value={percentageChange1m} size="md" /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 1y: <PercentageChangeFormatter value={percentageChange1y} size="md" /></Text>
                        </Flex>
                        */