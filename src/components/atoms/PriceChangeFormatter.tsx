import { MantineSize, NumberFormatter, Text } from "@mantine/core";
import React, { FC } from "react";
import { CurrencyEnum } from "types/types";

interface PriceChangeFormatterProps {
    value: number;
    currency: CurrencyEnum;
    size: MantineSize;
}

const PriceChangeFormatter: FC<PriceChangeFormatterProps> = ({ value, currency, size = 'sm' }) => {
    if (value > 0) {
        return (<Text c='green' size={size}><NumberFormatter prefix='+' suffix={` ${currency}`} value={value} decimalScale={2} fixedDecimalScale thousandSeparator=',' /></Text>)
    } else if (value < 0) {
        return (<Text c='red' size={size}><NumberFormatter prefix='-' suffix={` ${currency}`} value={value} decimalScale={2} fixedDecimalScale thousandSeparator=',' /></Text>)
    } else {
        return (<Text c='black' size={size}><NumberFormatter color='black' value={value} suffix={` ${currency}`} decimalScale={2} fixedDecimalScale thousandSeparator=',' /></Text>)
    }
};

export default PriceChangeFormatter;