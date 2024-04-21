import { Flex, Loader, Table, TextInput } from "@mantine/core";
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
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            const assets = await getAssets();
            setAssets(assets);
        })()
    }, []);

    if (!assets) {
        return (<Flex align='center' justify='center'><Loader size='lg' /></Flex>);
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
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>%24h</Table.Th>
                            <Table.Th>%7d</Table.Th>
                            <Table.Th>%1m</Table.Th>
                            <Table.Th>%1y</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {assets?.filter((item) => {
                            return search.toLowerCase() === '' ? item : `${item.name} ${item.ticker} ${item.category}`.toLowerCase().includes(search.toLowerCase());
                        }).map((item, index) => (
                            <Table.Tr key={item.id}>
                                <Table.Td>{index + 1}</Table.Td>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.ticker}</Table.Td>
                                <Table.Td>{item.category}</Table.Td>
                                <Table.Td>{`${item.currentPrice} ${item.currency}`}</Table.Td>
                                <Table.Td c={getPriceChangeColor(item.percentageChange24h)}>{getFormatPriceChange(item.percentageChange24h)}</Table.Td>
                                <Table.Td c={getPriceChangeColor(item.percentageChange7d)}>{getFormatPriceChange(item.percentageChange7d)}</Table.Td>
                                <Table.Td c={getPriceChangeColor(item.percentageChange1m)}>{getFormatPriceChange(item.percentageChange1m)}</Table.Td>
                                <Table.Td c={getPriceChangeColor(item.percentageChange1y)}>{getFormatPriceChange(item.percentageChange1y)}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Flex>);
    }
}

export default AssetsTable;