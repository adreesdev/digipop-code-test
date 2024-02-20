'use client';

import { useMemo } from 'react';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={mode}
            />
            {children}
        </ThemeProvider>
    );
}
