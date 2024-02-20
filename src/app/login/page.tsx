'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Stack,
    IconButton,
    InputBase,
    Button,
    Container,
    Typography,
    Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userLogin } from '@/utils/store/actions/userAction';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    password: string;
}

export default function Login() {
    const { loading, token } = useAppSelector((state) => state.user);

    const { register, handleSubmit } = useForm<User>();
    const dispatch = useAppDispatch();
    const [inputType, setInputType] = useState('password');
    const router = useRouter();

    const submitForm: SubmitHandler<User> = (data) => {
        dispatch(userLogin(data));
    };

    useEffect(() => {
        if (token) router.push('/');
    }, [token, router]);

    return (
        <Container
            maxWidth="sm"
            sx={{
                py: 5,
            }}
        >
            <form onSubmit={handleSubmit(submitForm)}>
                <Box
                    sx={{
                        width: '100%',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Typography variant="h3" textAlign="center">
                        User Login
                    </Typography>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <InputBase
                            placeholder="Enter UserName"
                            {...register('username')}
                            sx={{
                                width: '100%',
                                fontSize: '18px',
                            }}
                        />
                    </Paper>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <InputBase
                            placeholder="Enter Password"
                            type={inputType}
                            sx={{
                                width: '100%',
                                fontSize: '18px',
                            }}
                            {...register('password')}
                        />
                        <IconButton
                            onClick={() => {
                                setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
                            }}
                        >
                            {inputType === 'text' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </Paper>

                    <Button
                        variant="contained"
                        disabled={loading}
                        type="submit"
                        sx={{
                            py: 2,
                            fontWeight: 700,
                            width: '100%',
                        }}
                    >
                        Login
                    </Button>
                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                        <Box>New here ?</Box>
                        <Link
                            href="/signup"
                            style={{
                                textDecoration: 'none',
                                color: '#50A6ED',
                            }}
                        >
                            SignUp
                        </Link>
                    </Stack>
                </Box>
            </form>
        </Container>
    );
}
