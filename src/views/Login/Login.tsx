import { useMantineTheme, Flex, Text, Paper, Container, TextInput, PasswordInput, Button, Title, Anchor } from "@mantine/core";
import classes from './Login.module.css'
import React from "react";

const Login = () => {
    const theme = useMantineTheme();

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
                <TextInput label='Email' placeholder="Enter your email" required />
                <PasswordInput label='Password' placeholder="Your password" required mt='md' />
                <Anchor component="button" size="sm" mt='md'>
                    Forgot password?
                </Anchor>
                <Button fullWidth mt='xl'>Sign in</Button>
            </Paper>
        </Flex >

    );
}

export default Login;