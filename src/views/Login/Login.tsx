import { Flex, Text, Paper, TextInput, PasswordInput, Button, Title, Anchor, LoadingOverlay, Notification, Alert } from "@mantine/core";
import React, { useState } from "react";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SignInProps } from "types/types";
import { AxiosError, isAxiosError } from "axios";
import { useDisclosure } from "@mantine/hooks";

interface LoginFormValues extends SignInProps { };

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialFormValues: LoginFormValues = {
        email: 'jannowak@gmail.com',
        password: 'jannowak'
    }

    const form = useForm<LoginFormValues>({
        initialValues: initialFormValues,
        validate: {
            email: isEmail('Invalid email'),
            password: hasLength({ min: 8 }, 'min 8 characters'),
        }
    });

    const handleOnSubmit = async (values: LoginFormValues) => {
        setIsLoading(true);

        try {
            await auth.signIn(values);
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError;
                if (error.response) {
                    const errorData = error.response.data as { [key: string]: string };
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

        <Flex align='center' justify='center' direction='column' h='100vh' gap='md'>
            <Title ta='center'>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor onClick={() => navigate('/register')} size="sm" component="button">
                    Create account
                </Anchor>
            </Text>
            {errorMessage ? (<Alert w={400} variant="light" color="red" title="Error" withCloseButton onClick={() => setErrorMessage('')}>{errorMessage}</Alert>) : null}
            <Paper withBorder w={400} shadow='md' radius='md' p='sm'>
                <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <TextInput
                        label='Email'
                        placeholder="Enter your email"
                        required
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label='Password'
                        placeholder="Your password"
                        required mt='md'
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" fullWidth mt='xl'>Sign in</Button>
                </form>
            </Paper>
        </Flex >

    );
}

export default Login;