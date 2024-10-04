import { Box, CircularProgress } from '@mui/material';
import React, { ComponentType } from 'react';
import { useTheme } from '../../styles/ThemeContext';

interface LoadingDataContainerProps {
    display: React.ReactNode
    loadedData: (
        null |
        undefined |
        string |
        { default?: ComponentType<{}> } |
        string[] |
        { title: string, strength: number }[]
    )[]
}

const LoadingDataContainer: React.FC<LoadingDataContainerProps> = ({ display, loadedData }) => {

    const { palette } = useTheme()

    if (!loadedData.every(item => item)) {
        return (
            <Box className='fillWidth standardVerticalMargins horizontallyCenteredRow'>
                <CircularProgress size='clamp(24px, 5.5vw, 70px)' sx={{ color: palette.green }} />
            </Box>
        )
    }

    return display
}

export default LoadingDataContainer;
