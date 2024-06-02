import { Alert, Autocomplete, Button, LoadingOverlay, Modal, ModalProps, NumberInput, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { AxiosError, isAxiosError } from "axios";
import { useAssets } from "hooks/useAssets";
import { useTransactions } from "hooks/useTransactions";
import React, { FC, useEffect, useState } from "react";
import { AssetName, CreateTransactionProps, TransactionEnum, WalletProps } from "types/types";

const transactionTypeArr = Object.keys(TransactionEnum).filter((x) => isNaN(Number(x)));

const assetNameToSelectOption = (item: AssetName) => {
    return { label: `${item.ticker} ${item.name}`, value: item.id.toString() };
}

interface CreateTransactionFormModalProps extends ModalProps {
    wallet: WalletProps
}

interface FormValuesProps {
    assetName: string;
    transactionType: string;
    quantity: number;
    price: number;
    initialValue: number;
    transactionDate: Date;
}

const CreateTransactionFormModal: FC<CreateTransactionFormModalProps> = ({ opened, onClose, wallet }) => {
    const { getAssetNameslist, getAssetById } = useAssets();
    const { addTransaction } = useTransactions()
    const [assetNameSelectOptions, setAssetNameSelectOptions] = useState<{ label: string, value: string }[]>();
    const [assetNames, setAssetNames] = useState<AssetName[]>([]);
    const [assetQuantity, setAssetQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            const assetNameslist = await getAssetNameslist();

            const assetNameSelectOptions = assetNameslist?.map((item) => assetNameToSelectOption(item));

            setAssetNameSelectOptions(assetNameSelectOptions ?? []);

            form.setValues(initialFormValues);
            form.resetDirty(initialFormValues);

            setAssetNames(assetNameslist ?? []);
            setIsLoading(false);
        })()
    }, [opened]);

    const form = useForm<FormValuesProps>({
        validate: {
            assetName: isNotEmpty(),
            transactionType: isNotEmpty(),
            quantity: isNotEmpty(),
            initialValue: isNotEmpty(),
            transactionDate: isNotEmpty()
        }
    });

    const initialFormValues: FormValuesProps = {
        assetName: '',
        transactionType: transactionTypeArr[1],
        quantity: 0,
        price: 0,
        initialValue: 0,
        transactionDate: new Date(),
    }

    const handleOnChangeTransactionType = async (value: string) => {
        form.setValues(initialFormValues);
        form.resetDirty(initialFormValues);
        form.setFieldValue('transactionType', value);

        if (value === TransactionEnum[TransactionEnum.Sell]) {
            const newSelectOptions = (assetNames.filter((item) => wallet.assetPositions.some((position) => position.assetId === item.id && position.quantity > 0))).map((item) => assetNameToSelectOption(item));
            setAssetNameSelectOptions(newSelectOptions);
        } else {
            const newSelectOptions = assetNames.map((item) => assetNameToSelectOption(item));
            setAssetNameSelectOptions(newSelectOptions);
        }
    }

    const handleOnChangeAsset = async (value: string) => {
        form.setFieldValue('assetName', value);

        const asset = await getAssetById(parseInt(value));

        form.setFieldValue('price', asset?.currentPrice ?? 0);

        if (form.values.transactionType === TransactionEnum[TransactionEnum.Sell]) {
            const assetQuantity = wallet.assetPositions.find(item => item.assetId === parseInt(value));
            setAssetQuantity(assetQuantity?.quantity ?? 0);
        } else {
            setAssetQuantity(0);
        }
    }

    const handleOnChangeValues = async (inputKey: string, value: number) => {
        form.setFieldValue(inputKey, value);

        switch (inputKey) {
            case 'quantity':
                form.setFieldValue('initialValue', value * form.values.price);
                break;
            case 'price':
                form.setFieldValue('initialValue', value * form.values.quantity);
                break;
            case 'initialValue':
                form.values.quantity !== 0 && value !== 0 ? form.setFieldValue('price', value / form.values.quantity) : form.setFieldValue('price', 0);
                break;
        }
    }

    const handleOnSubmit = async ({ assetName, transactionType, quantity, initialValue, transactionDate }: FormValuesProps) => {
        setIsLoading(true);
        setErrorMessage('');

        const convertedFormValues: CreateTransactionProps = {
            assetId: parseInt(assetName),
            type: transactionType,
            quantity: quantity,
            initialValue: initialValue,
            transactionDate: transactionDate.toISOString()
        }

        try {
            await addTransaction(wallet.id, convertedFormValues);
            setIsLoading(false);
            onClose();
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError;
                console.log(error);
                if (error.response) {
                    const errorData = (error.response.data as { errors: { [key: string]: string } }).errors;

                    if (errorData === undefined) {
                        const errorData = (error.response.data as { error: string }).error;
                        setErrorMessage(errorData);
                    } else {
                        const key = Object.keys(errorData)[0];
                        setErrorMessage(errorData[key]);
                    }
                } else {
                    setErrorMessage(error.message);
                }
                setIsLoading(false);
            }
        }

        setIsLoading(false);
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Add transaction" centered>
            {errorMessage ? (<Alert w={400} variant="light" color="red" title="Error" withCloseButton onClick={() => setErrorMessage('')}>{errorMessage}</Alert>) : null}
            <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Select
                    label='Type'
                    data={transactionTypeArr}
                    mt='md'
                    allowDeselect={false}
                    required
                    {...form.getInputProps('transactionType')}
                    onChange={(value) => handleOnChangeTransactionType(value ?? '')}
                />
                <Select
                    label='Asset'
                    data={assetNameSelectOptions}
                    mt='md'
                    nothingFoundMessage="Nothing found..."
                    required
                    searchable
                    {...form.getInputProps('assetName')}
                    onChange={(value) => handleOnChangeAsset(value ?? '')}
                />
                <NumberInput
                    label={`Quantity${form.values.transactionType === TransactionEnum[TransactionEnum.Sell] ? ` (Balance: ${assetQuantity})` : ''}`}
                    mt='md'
                    decimalScale={8}
                    thousandSeparator=","
                    decimalSeparator="."
                    placeholder={form.values.transactionType === TransactionEnum[TransactionEnum.Sell] ? `Max ${assetQuantity}` : ''}
                    max={form.values.transactionType === TransactionEnum[TransactionEnum.Sell] ? assetQuantity : undefined}
                    min={0.00000001}
                    required
                    {...form.getInputProps('quantity')}
                    onChange={(value) => handleOnChangeValues('quantity', value as number)}
                />
                <NumberInput
                    label='Price'
                    mt='md'
                    decimalScale={8}
                    thousandSeparator=","
                    decimalSeparator="."
                    min={0.00000001}
                    required
                    {...form.getInputProps('price')}
                    onChange={(value) => handleOnChangeValues('price', value as number)}
                />
                <NumberInput
                    label='Value'
                    mt='md'
                    decimalScale={8}
                    thousandSeparator=","
                    decimalSeparator="."
                    min={0.00000001}
                    required
                    {...form.getInputProps('initialValue')}
                    onChange={(value) => handleOnChangeValues('initialValue', value as number)}
                />
                <DateTimePicker
                    clearable
                    mt='md'
                    label="Transaction date"
                    placeholder="Pick date and time"
                    required
                    {...form.getInputProps('transactionDate')}
                />
                <Button type='submit' fullWidth mt='xl'>Add</Button>
            </form>
        </Modal>
    );
}

export default CreateTransactionFormModal;