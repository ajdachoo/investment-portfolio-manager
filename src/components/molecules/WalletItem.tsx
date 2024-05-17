import { DonutChart, DonutChartCell } from "@mantine/charts";
import { Flex, NumberFormatter, Paper, Title, Text } from "@mantine/core";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import PriceChangeFormatter from "components/atoms/PriceChangeFormatter";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AssetCategoryEnum, WalletProps } from "types/types";

interface WalletItemProps {
    wallet: WalletProps;
}

const getDonutChartColor = (category: AssetCategoryEnum) => {
    switch (category) {
        case AssetCategoryEnum.Cryptocurrencies:
            return 'orange.5';
        case AssetCategoryEnum.PhysicalCurrencies:
            return 'green.5';
        case AssetCategoryEnum.PolishStocks:
            return 'red.5';
        case AssetCategoryEnum.USStocks:
            return 'blue.5';
    }
}

const WalletItem: React.FC<WalletItemProps> = ({ wallet: { id, name, details, assetCategoryPositions, currentValue, totalCost, totalProfit, currency, percentageChange24h, percentageChange1m, percentageChange7d, percentageChange1y } }) => {
    const navigate = useNavigate();
    const data: DonutChartCell[] = [];

    assetCategoryPositions.forEach(({ categoryName, percentageInWallet }) => {
        data.push({ name: categoryName, value: percentageInWallet, color: getDonutChartColor(categoryName) });
    })

    return (
        <Paper shadow='md' radius='md' h={500} p='md' style={{ cursor: 'pointer' }} onClick={() => navigate(`${id}`)}>
            <Flex align='center' direction='column' gap='md'>
                <Title order={3}>{name}</Title>
                <Text c="dimmed">{details}</Text>
                {assetCategoryPositions.length > 0 ?
                    <>
                        <DonutChart size={160} thickness={20} data={data} valueFormatter={(value) => value.toFixed(2) + '%'} />
                        <Flex direction='column' wrap='wrap' align='start' w='100%'>
                            <Text size='md'>Current Balance: <NumberFormatter value={currentValue} suffix={` ${currency}`} decimalScale={2} thousandSeparator=',' /></Text>
                            <Text display='inline-flex' size='md'>Total Profit/Loss: <PriceChangeFormatter size='md' value={totalProfit} currency={currency} /></Text>
                            <Text size='md'>Total Cost: <NumberFormatter value={totalCost} suffix={` ${currency}`} decimalScale={2} thousandSeparator=',' /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 24h: <PercentageChangeFormatter value={percentageChange24h} size="md" /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 7d: <PercentageChangeFormatter value={percentageChange7d} size="md" /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 1m: <PercentageChangeFormatter value={percentageChange1m} size="md" /></Text>
                            <Text display='inline-flex' size="md">Percentage Change 1y: <PercentageChangeFormatter value={percentageChange1y} size="md" /></Text>
                        </Flex>
                    </>
                    : <Title order={4}>No transactions</Title>}
            </Flex>
        </Paper>
    );
};

export default WalletItem;