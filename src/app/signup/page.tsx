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
    Select,
    MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { userSignup } from '@/utils/store/actions/userAction';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    password: string;
}

export default function Login() {
    const { loading, success } = useAppSelector((state) => state.user);

    const { register, handleSubmit, control } = useForm<User>();
    const dispatch = useAppDispatch();
    const [inputType, setInputType] = useState('password');

    const submitForm: SubmitHandler<User> = (data) => {
        dispatch(userSignup(data));
    };
    const router = useRouter();

    useEffect(() => {
        if (success) router.push('/login');
    }, [success, router]);

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
                        User Signup
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
                            required
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
                            placeholder="Enter First Name"
                            required
                            {...register('firstName')}
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
                            placeholder="Enter Last Name"
                            required
                            {...register('lastName')}
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
                            placeholder="Enter Email"
                            required
                            {...register('email')}
                            sx={{
                                width: '100%',
                                fontSize: '18px',
                            }}
                        />
                    </Paper>
                    <Paper
                        variant="outlined"
                        sx={{
                            py: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    required
                                    {...field}
                                    sx={{
                                        width: '100%',
                                        fontSize: '18px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Select Gender</MenuItem>
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                </Select>
                            )}
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
                            required
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
                        Signup
                    </Button>
                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                        <Box>Already Signup ?</Box>
                        <Link
                            href="/login"
                            style={{
                                textDecoration: 'none',
                                color: '#50A6ED',
                            }}
                        >
                            Login
                        </Link>
                    </Stack>
                </Box>
            </form>
        </Container>
    );
}
