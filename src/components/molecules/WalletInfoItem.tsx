import { Box, Paper, Text } from "@mantine/core";
import React, { FC } from "react";

interface WalletInfoItemProps {
    children?: React.ReactNode
    label: string;
}

const WalletInfoItem: FC<WalletInfoItemProps> = ({ label, children }) => {
    return (
        <Paper p='sm' shadow='none' withBorder w={200}>
            {children}
            <Text c="dimmed" size='sm'>{label}</Text>
        </Paper>
    );
}

export default WalletInfoItem;