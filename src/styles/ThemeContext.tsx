import { createContext, useState, useContext, ReactNode } from 'react';
import { darkPalette, lightPalette } from './palette';

export interface Typography {
    pageLabel: React.CSSProperties;
    intenseHeader: React.CSSProperties;
    header: React.CSSProperties;
    label: React.CSSProperties;
    content: React.CSSProperties;
    subContent: React.CSSProperties;
    smallButton: React.CSSProperties;
    button: React.CSSProperties;
    navButton: React.CSSProperties;
}

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
    palette: typeof darkPalette;
    typography: Typography;
}

const defaultContext: ThemeContextType = {
    theme: 'dark',
    toggleTheme: () => { },
    palette: darkPalette,
    typography: {
        pageLabel: { fontSize: 'clamp(24px, 5.5vw, 70px)', letterSpacing: 'clamp(-8px, -.4vw, -2px)', wordSpacing: 'clamp(-14px, -.5vw, -4px)', padding: '5px 10px', lineHeight: 1 },
        intenseHeader: { fontSize: 'clamp(16px, 4vw, 50px)', fontFamily: 'Arial' },
        header: { fontSize: 'clamp(15px, 3.75vw, 35px)', fontWeight: 550, cursor: 'default', letterSpacing: 0, fontFamily: 'Arial', color: darkPalette.intenseCustomText },
        label: { fontSize: 'clamp(12px, 3vw, 20px)', fontFamily: 'Arial', cursor: 'default', fontWeight: 600, letterSpacing: 0, color: darkPalette.neautralCustomText },
        content: { fontFamily: 'Arial', fontSize: 'clamp(12px, 3vw, 20px)', lineHeight: 'clamp(14px, 3.5vw, 26px)', color: darkPalette.passiveText, margin: 0 },
        subContent: { color: darkPalette.passiveText, fontSize: 'clamp(8px, 2vw, 14px)' },
        smallButton: { fontSize: 'clamp(10px, 2.5vw, 16px)' },
        button: { fontSize: 'clamp(12px, 3vw, 20px)' },
        navButton: { fontSize: 'clamp(12px, 2vw, 20px)', width: 'clamp(100px, 12vw, 160px)' }
    }
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const currentPalette = theme === 'dark' ? darkPalette : lightPalette;

    const typography: Typography = {
        pageLabel: { fontSize: 'clamp(24px, 5.5vw, 70px)', fontFamily: 'Arial', letterSpacing: 'clamp(-8px, -.4vw, -2px)', wordSpacing: 'clamp(-14px, -.5vw, -4px)', padding: '5px 10px', lineHeight: 1 },
        intenseHeader: { fontSize: 'clamp(16px, 4vw, 50px)', fontFamily: 'Arial' },
        header: { fontSize: 'clamp(15px, 3.75vw, 35px)', fontWeight: 550, cursor: 'default', letterSpacing: 0, fontFamily: 'Arial', color: currentPalette.intenseCustomText },
        label: { fontSize: 'clamp(14px, 3.5vw, 24px)', fontFamily: 'Arial', cursor: 'default', fontWeight: 600, letterSpacing: 0, color: currentPalette.neautralCustomText },
        content: { fontFamily: 'Arial', fontSize: 'clamp(12px, 3vw, 20px)', lineHeight: 'clamp(16px, 3.5vw, 26px)', color: currentPalette.passiveText, margin: 0 },
        subContent: { color: currentPalette.passiveText, fontSize: 'clamp(8px, 2vw, 14px)' },
        smallButton: { fontSize: 'clamp(10px, 2.5vw, 16px)' },
        button: { fontSize: 'clamp(12px, 3vw, 20px)' },
        navButton: { fontSize: 'clamp(12px, 1.5vw, 20px)', width: 'clamp(75px, 12vw, 160px)' }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, palette: currentPalette, typography }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);