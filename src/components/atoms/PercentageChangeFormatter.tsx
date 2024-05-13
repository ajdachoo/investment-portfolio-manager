import { MantineComponent, MantineSize, NumberFormatter, Text } from "@mantine/core";
import React, { FC } from "react";

interface PercentageChangeFormatterProps {
    value: number;
    size: MantineSize;
}

const PercentageChangeFormatter: FC<PercentageChangeFormatterProps> = ({ value, size }) => {
    if (value > 0) {
        return (<Text size={size} c='green' ><NumberFormatter prefix='+' suffix='%' value={value} decimalScale={2} fixedDecimalScale /></Text>)
    } else if (value < 0) {
        return (<Text size={size} c='red' ><NumberFormatter suffix='%' value={value} decimalScale={2} fixedDecimalScale /></Text>)
    } else {
        return (<Text size={size} c='black' ><NumberFormatter color='black' value={value} suffix='%' decimalScale={2} fixedDecimalScale /></Text>)
    }
};

export default PercentageChangeFormatter;