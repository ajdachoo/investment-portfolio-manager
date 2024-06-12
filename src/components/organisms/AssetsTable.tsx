import { Flex, Loader, NumberFormatter, Pagination, Table, TextInput } from "@mantine/core";
import PercentageChangeFormatter from "components/atoms/PercentageChangeFormatter";
import { useAssets } from "hooks/useAssets";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AssetProps, PagedResult } from "types/types";

const AssetsTable = () => {
    const { getAssets } = useAssets();
    const [assets, setAssets] = useState<PagedResult<AssetProps>>();
    const [search, setSearch] = useState('');
    const { page, searchPhrase } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setAssets(undefined);
            const data = await getAssets(100, parseInt(page as string), searchPhrase);
            setAssets(data);
        })()
    }, [page, searchPhrase]);

    const handleOnEnterPress = async () => {
        navigate(`/assets/page/1/${search}`);
    }

    if (!assets) {
        return (<Flex align='center' justify='center'><Loader size='lg' /></Flex>);
    } else {
        return (
            <Flex direction='column' justify='flex-start' align='center' w='100%' gap='sm'>
                <TextInput w='100%' onKeyDown={(e) => e.key === 'Enter' ? handleOnEnterPress() : null} value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
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
                        {assets.items.map((item, index) => (
                            <Table.Tr key={item.id}>
                                <Table.Td>{index + 1 + 100 * (parseInt(page as string) - 1)}</Table.Td>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.ticker}</Table.Td>
                                <Table.Td>{item.category}</Table.Td>
                                <Table.Td><NumberFormatter value={item.currentPrice} suffix={` ${item.currency}`} decimalScale={2} thousandSeparator=',' /></Table.Td>
                                <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange24h} /></Table.Td>
                                <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange7d} /></Table.Td>
                                <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange1m} /></Table.Td>
                                <Table.Td><PercentageChangeFormatter size='sm' value={item.percentageChange1y} /></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                <Pagination p='md' total={assets.totalPages} value={parseInt(page as string)} onChange={(value) => navigate(`/assets/page/${value}/${search}`)} mt="sm" />
            </Flex>);
    }
}

export default AssetsTable;