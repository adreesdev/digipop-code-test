'use client';
import React, { useEffect, useState } from 'react';
import { Container, Box, IconButton, Typography, useTheme, Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { RootState } from '../utils/store/store';
import { changeTheme } from '@/utils/store/features/themeSlice';
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import { userAuth } from '@/utils/store/actions/userAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { handlekOpen } from '@/utils/store/features/todoSlice';

const Header = () => {
    const [first, setfirst] = useState(false);
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state: RootState) => state.theme.mode);
    const token = useAppSelector((state: RootState) => state.user.token);
    const router = useRouter();
    const theme = useTheme();

    useEffect(() => {
        if (token) {
            dispatch(userAuth({ token }));
            router.push('/');
            setfirst(true);
        } else {
            setfirst(false);
        }
    }, [token, dispatch, router]);

    return (
        <>
            <Container>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    py={2}
                >
                    <Typography variant="h4">LOGO</Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        {first ? (
                            <Button
                                onClick={() => dispatch(handlekOpen('Add'))}
                                variant="contained"
                            >
                                Add Todo
                            </Button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    style={{
                                        textDecoration: 'none',
                                        color: `${theme.palette.text.primary}`,
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    style={{
                                        textDecoration: 'none',
                                        color: `${theme.palette.text.primary}`,
                                    }}
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                        <IconButton onClick={() => dispatch(changeTheme())}>
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Header;
