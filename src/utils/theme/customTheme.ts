import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

interface Theme {
    light: {
        text: {
            primary: string;
        };
        background: {
            default: string;
            paper: string;
        };
    };
    dark: {
        text: {
            primary: string;
        };
        background: {
            default: string;
            paper: string;
        };
    };
}

const themeObj: Theme = {
    light: {
        text: {
            primary: '#000',
        },
        background: {
            default: '#fff',
            paper: '#fdfdfd',
        },
    },
    dark: {
        text: {
            primary: '#fff',
        },
        background: {
            default: '#000',
            paper: '#151515',
        },
    },
};

export const createCustomTheme = (mode: PaletteMode) =>
    createTheme({
        palette: {
            mode,
            ...themeObj[mode],
        },
        typography: {
            fontFamily: ['"Poppins"', 'sans-serif'].join(','),
            h1: {
                fontFamily: '"Squada One", sans-serif',
                fontSize: '4rem',
            },
            h4: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1.125rem',
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => `
		    body {
		      background-color: ${theme.palette.mode === 'dark' ? '#131213' : '#fdfdfd'}
		    }
		  `,
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'contained' },
                        style: {
                            background: 'linear-gradient(97.01deg, #6C7DEB 8.16%, #50A6ED 103.71%)',
                            boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            fontFamily: '"Poppins", sans-serif',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                            '&:hover': {
                                background:
                                    'linear-gradient(97.01deg, #50A6ED 8.16%, #6C7DEB 103.71%)',
                            },
                        },
                    },
                ],
            },
        },
    });
