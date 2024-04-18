import { Flex, Loader, Table } from "@mantine/core";
import { useAssets } from "hooks/useAssets";
import React, { useEffect, useState } from "react";
import { AssetCategoryEnum, AssetProps } from "types/types";

const getFormatPriceChange = (n: number) => {
    if (n > 0) {
        return `+${n.toFixed(2)}%`;
    }
    else {
        return `${n.toFixed(2)}%`;
    }
};

const getPriceChangeColor = (n: number) => {
    if (n > 0) {
        return 'green';
    } else if (n < 0) {
        return 'red';
    } else {
        return 'black';
    }
}

const AssetsTable = () => {
    const { getAssets } = useAssets();
    const [assets, setAssets] = useState<AssetProps[]>();

    useEffect(() => {
        (async () => {
            const assets = await getAssets();
            setAssets(assets);
        })()
    }, []);

    if (!assets) {
        return (<Loader size='lg' />);
    } else {
        return (
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Ticker</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>%24h</Table.Th>
                        <Table.Th>%7d</Table.Th>
                        <Table.Th>%1m</Table.Th>
                        <Table.Th>%1y</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {assets?.map((asset, index) => (
                        <Table.Tr key={asset.id}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td>{asset.name}</Table.Td>
                            <Table.Td>{asset.ticker}</Table.Td>
                            <Table.Td>{asset.category}</Table.Td>
                            <Table.Td>{`${asset.currentPrice} ${asset.currency}`}</Table.Td>
                            <Table.Td c={getPriceChangeColor(asset.percentageChange24h)}>{getFormatPriceChange(asset.percentageChange24h)}</Table.Td>
                            <Table.Td c={getPriceChangeColor(asset.percentageChange7d)}>{getFormatPriceChange(asset.percentageChange7d)}</Table.Td>
                            <Table.Td c={getPriceChangeColor(asset.percentageChange1m)}>{getFormatPriceChange(asset.percentageChange1m)}</Table.Td>
                            <Table.Td c={getPriceChangeColor(asset.percentageChange1y)}>{getFormatPriceChange(asset.percentageChange1y)}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>);
    }
}

export default AssetsTable;