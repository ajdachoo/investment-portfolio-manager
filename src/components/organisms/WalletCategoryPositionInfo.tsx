import { Flex, NumberFormatter, Text } from "@mantine/core";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import WalletInfoItem from "components/molecules/WalletInfoItem";
import React, { FC } from "react";
import { AssetCategoryPosition, WalletProps } from "types/types";

interface WalletCategoryPositionInfoProps {
    wallet: WalletProps;
    categoryId: number
}

const WalletCategoryPositionInfo: FC<WalletCategoryPositionInfoProps> = ({ wallet, categoryId }) => {
    const categoryPosition = wallet.assetCategoryPositions.find((item) => item.categoryId === categoryId) as AssetCategoryPosition;

    return (
        <Flex gap='md' wrap='wrap'>
            <WalletInfoItem label='Category Name'>
                <Text fw={500}>{categoryPosition?.categoryName}</Text>
            </WalletInfoItem>
            <WalletInfoItem label="Total Value">
                <NumberFormatter value={categoryPosition.totalValue} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' />
            </WalletInfoItem>
            <WalletInfoItem label="Total Cost">
                <NumberFormatter value={categoryPosition.totalCost} suffix={` ${wallet.currency}`} decimalScale={2} thousandSeparator=',' />
            </WalletInfoItem>
            <WalletInfoItem label="Total Profit/Loss">
                <PriceChangeFormatter size='md' value={categoryPosition.totalProfit} currency={wallet.currency} />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 24h">
                <PercentageChangeFormatter value={categoryPosition.percentageChange24h} size="md" />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 7d">
                <PercentageChangeFormatter value={categoryPosition.percentageChange7d} size="md" />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 1m">
                <PercentageChangeFormatter value={categoryPosition.percentageChange1m} size="md" />
            </WalletInfoItem>
            <WalletInfoItem label="Percentage Change 1y">
                <PercentageChangeFormatter value={categoryPosition.percentageChange1y} size="md" />
            </WalletInfoItem>
        </Flex>
    );
};

export default WalletCategoryPositionInfo