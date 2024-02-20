import { Flex, Text, Paper, TextInput, PasswordInput, Button, Title, Anchor, LoadingOverlay } from "@mantine/core";
import React, { useState } from "react";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useAuth } from "hooks/useAuth";

interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);

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
        const isLogged = await auth.signIn(values);
        if (!isLogged) {
            console.log('promise zlapany');
            form.setFieldError('password', 'Invalid email or password');
            form.setFieldError('email', ' ');
            setIsLoading(false);
        }
    }



    return (

        <Flex align='center' justify='center' direction='column' h='100vh' gap='md'>
            <Title ta='center'>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>
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
                    <Anchor component="button" size="sm" mt='md'>
                        Forgot password?
                    </Anchor>
                    <Button type="submit" fullWidth mt='xl'>Sign in</Button>
                </form>
            </Paper>
        </Flex >

    );
}

export default Login;