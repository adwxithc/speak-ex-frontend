import { createTheme } from '@mui/material/styles';
export const lightTheme = createTheme({
    palette: {
        mode: 'light', // Set mode to 'light'
        primary: {
            main: '#00255F', // Your light mode primary color
        },
        secondary: {
            main: '#ffc107', // Your light mode secondary color
        },
        background: {
            default: '#fff', // Your light mode background color
        },
        text: {
            primary: '#000000ac', // Your light mode text color
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Set mode to 'dark'
        primary: {
            main: '#007bff', // Your dark mode primary color (can be different from light)
        },
        secondary: {
            main: '#ffc107', // Your dark mode secondary color (can be different from light)
        },
        background: {
            default: '#000', // Your dark mode background color
        },
        text: {
            primary: '#fff', // Your dark mode text color
        },
    },
});
