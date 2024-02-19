'use client';
import React from 'react';
import { Container, Box, IconButton, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { RootState } from '../utils/store/store';
import { changeTheme } from '@/utils/store/features/themeSlice';
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';

const Header = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state: RootState) => state.theme.mode);
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
                            gap: 2,
                        }}
                    >
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
