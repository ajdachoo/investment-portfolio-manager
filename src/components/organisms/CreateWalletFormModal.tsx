import { Alert, Button, LoadingOverlay, Modal, ModalProps, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { AxiosError, isAxiosError } from "axios";
import { useWallets } from "hooks/useWallets";
import React, { FC, useState } from "react";
import { CreateWalletProps } from "types/types";

interface CreateWalletFormModalProps extends ModalProps {

}

const CreateWalletFormModal: FC<CreateWalletFormModalProps> = ({ opened, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { createWallet } = useWallets();

    const initialFormValues: CreateWalletProps = {
        name: '',
        details: ''
    }

    const form = useForm<CreateWalletProps>({
        initialValues: initialFormValues,
        validate: {
            name: isNotEmpty()
        }
    });

    const handleOnSubmit = async (values: CreateWalletProps) => {
        setIsLoading(true);
        try {
            await createWallet(values);
            onClose();
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError;
                console.log(error);
                if (error.response) {
                    const errorData = error.response.data as { [key: string]: string };
                    console.log(errorData);
                    const key = Object.keys(errorData)[0];
                    setErrorMessage(errorData[key]);
                } else {
                    setErrorMessage(error.message);
                }
            }
        }
        setIsLoading(false);
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Create wallet" centered>
            {errorMessage ? (<Alert w={400} variant="light" color="red" title="Error" withCloseButton onClick={() => setErrorMessage('')}>{errorMessage}</Alert>) : null}
            <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <TextInput
                    label='Wallet name'
                    required
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label='Details'
                    mt='md'
                    {...form.getInputProps('details')}
                />
                <Button type='submit' fullWidth mt='xl'>Create</Button>
            </form>
        </Modal>
    );
};

export default CreateWalletFormModal;