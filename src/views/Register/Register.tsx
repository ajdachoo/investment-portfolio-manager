import React, { useState } from "react";
import { Alert, Anchor, Button, Flex, LoadingOverlay, NativeSelect, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { CurrencyEnum, RegisterUserProps } from "types/types";
import { useNavigate } from "react-router-dom";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useAuth } from "hooks/useAuth";
import { AxiosError, isAxiosError } from "axios";

const currencyArr = Object.keys(CurrencyEnum).filter((x) => isNaN(Number(x)));

interface RegisterFormValues extends RegisterUserProps {
    currency: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const auth = useAuth();

    const initialFormValues: RegisterFormValues = {
        firstName: 'Janusz',
        lastName: 'Nosacz',
        password: 'janusznosacz',
        confirmPassword: 'janusznosacz',
        email: 'janusznosacz@gmail.com',
        currency: currencyArr[0],
    }

    const form = useForm<RegisterFormValues>({
        initialValues: initialFormValues,
        validate: {
            firstName: isNotEmpty(),
            lastName: isNotEmpty(),
            password: hasLength({ min: 8 }, 'min 8 characters'),
            confirmPassword: (value, values) => value !== values.password ? 'Password did not match' : null,
            email: isEmail('Invalid email'),
            currency: isNotEmpty(),
        }
    });

    const handleOnSubmit = async (values: RegisterFormValues) => {
        setIsLoading(true);
        try {
            await auth.registerUser(values);
            navigate('/login');
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError;
                if (error.response) {
                    const errorData = (error.response.data as { errors: { [key: string]: string } }).errors;
                    const key = Object.keys(errorData)[0];
                    setErrorMessage(errorData[key]);
                } else {
                    setErrorMessage(error.message);
                }
                setIsLoading(false);
            }
        }
    }


    return (

        <Flex align='center' justify='center' direction='column' mih='100vh' gap='md'>
            <Title ta='center'>
                Create an Account
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor onClick={() => navigate('/login')} size="sm" component="button">
                    Sign In
                </Anchor>
            </Text>
            {errorMessage ? (<Alert w={400} variant="light" color="red" title="Error" withCloseButton onClick={() => setErrorMessage('')}>{errorMessage}</Alert>) : null}
            <Paper withBorder w={400} shadow='md' radius='md' p='sm'>
                <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <TextInput
                        label='First name'
                        required
                        {...form.getInputProps('firstName')}
                    />
                    <TextInput
                        label='Last name'
                        mt='md'
                        required
                        {...form.getInputProps('lastName')}
                    />
                    <TextInput
                        label='Email'
                        placeholder="Enter your email"
                        mt='md'
                        required
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label='Password'
                        placeholder="Your password"
                        mt='md'
                        required
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        label='Confirm password'
                        placeholder="Confirm your password"
                        mt='md' required
                        {...form.getInputProps('confirmPassword')}
                    />
                    <NativeSelect
                        label='Currency'
                        data={currencyArr}
                        mt='md'
                        required
                        {...form.getInputProps('currency')}
                    />
                    <Button type='submit' fullWidth mt='xl'>Sign up</Button>
                </form>
            </Paper>
        </Flex >
    );
}

export default Register;