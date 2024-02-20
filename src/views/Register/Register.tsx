import React from "react";
import { Anchor, Button, Flex, LoadingOverlay, NativeSelect, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { CurrencyEnum } from "types/types";
import { useNavigate } from "react-router-dom";

const currencyArr = Object.keys(CurrencyEnum).filter((x) => isNaN(Number(x)));

const Register = () => {
    const navigate = useNavigate();

    return (

        <Flex align='center' justify='center' direction='column' h='100vh' gap='md'>
            <Title ta='center'>
                Create an Account
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have na account?{' '}
                <Anchor onClick={() => navigate('/login')} size="sm" component="button">
                    Sign In
                </Anchor>
            </Text>
            <Paper withBorder w={400} shadow='md' radius='md' p='sm'>
                <TextInput label='First name' required></TextInput>
                <TextInput label='Last name' mt='md' required></TextInput>
                <TextInput label='Email' placeholder="Enter your email" mt='md' required />
                <PasswordInput label='Password' placeholder="Your password" mt='md' required />
                <PasswordInput label='Confirm password' placeholder="Confirm your password" mt='md' required />
                <NativeSelect label='Currency' data={currencyArr} mt='md' required />
                <Button fullWidth mt='xl'>Sign up</Button>
            </Paper>
        </Flex >
    );
}

export default Register;

/*"firstName": "string",
    "lastName": "string",
        "password": "string",
            "confirmPassword": "string",
                "email": "string",
                    "currency": "string" */