import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
    theme: 'dark'
});

const themes = {
    'light': createTheme({}),
    'dark': createTheme({
        palette: {
            mode: 'dark'
        }
    })
}

export function ThemeManager(props: any) {
    const [theme, setTheme] = useState('light');

    const currentTheme = themes[theme];
    window.document.body.style.backgroundColor = currentTheme.palette.background.default;
    window.document.body.style.color = currentTheme.palette.text.primary;
    return (<ThemeContext.Provider
        value={{
            theme
        }}
    >
        <ThemeProvider theme={currentTheme}>
            {props.children}
        </ThemeProvider>
    </ThemeContext.Provider>)
}