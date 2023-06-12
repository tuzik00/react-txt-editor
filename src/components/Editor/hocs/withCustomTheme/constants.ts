import { createTheme } from '@mui/material';
import { common } from '@mui/material/colors';

import {
    responsiveFontSizes,
} from '@mui/material/styles';

const breakpointTheme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 768,
            laptop: 1024,
            desktop: 1440,
        },
    },
});

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            light: '#151528',
            dark: '#1976d2',
            contrastText: common.white,
        },
        secondary: {
            main: '#151528',
            light: '#1976d2',
            dark: '#1976d2',
            contrastText: common.white,
        },
        grey: {
            200: '#F5F5F6',
            600: '#BFBFBF',
            800: '#5D5D64',
        },
    },
    breakpoints: {
        values: breakpointTheme.breakpoints.values,
    },
    typography: {
        fontFamily: '"PTRootUIWeb", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 'bold' },
        h2: { fontWeight: 'bold' },
        h3: { fontWeight: 'bold' },
        h4: { fontWeight: 'bold' },
        h5: { fontWeight: 'bold' },
        h6: { fontWeight: 'bold' },
        body1: {
            fontSize: '1rem',
            [breakpointTheme.breakpoints.up('tablet')]: {
                fontSize: '1.1rem',
            },
        },
    },
    components: {
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: '#5D5D64',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
});

export const customTheme = responsiveFontSizes(defaultTheme, {
    breakpoints: ['mobile', 'tablet', 'desktop'],
});
