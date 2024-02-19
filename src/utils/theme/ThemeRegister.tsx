'use client';

import { useMemo } from 'react';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { createCustomTheme } from './customTheme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const mode = useAppSelector((state: RootState) => state.theme.mode);
    const themeA = useMemo(() => {
        let theme = createCustomTheme(mode);
        theme = responsiveFontSizes(theme);
        return theme;
    }, [mode]);

    return (
        <ThemeProvider theme={themeA}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}
