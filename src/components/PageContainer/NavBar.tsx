import { useEffect, useRef } from 'react';
import { Box, ButtonGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/globalStyles.css';
import { useTheme } from '../../styles/ThemeContext';
import '../../styles/NavBar.css';
import CustomButton from '../Buttons/CustomButton';

interface NavBarProps {
    currPage: string;
    setNavBarHeight: (height: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currPage, setNavBarHeight }) => {
    const navigate = useNavigate();
    const { palette, typography } = useTheme();
    const navBarRef = useRef<HTMLDivElement>(null);

    const updateNavBarHeight = () => {
        if (navBarRef.current) {
            setNavBarHeight(navBarRef.current.offsetHeight);
        }
    };

    useEffect(() => {
        updateNavBarHeight();
        window.addEventListener('resize', updateNavBarHeight);
        return () => window.removeEventListener('resize', updateNavBarHeight);
    }, []);

    return (
        <Box ref={navBarRef} className="navBarContainer standardBottomPadded">
            <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <Typography sx={typography.pageLabel}>
                    <span style={{ color: palette.intenseCustomText, fontFamily: 'Menlo' }}>
                        Alexander {' '}
                    </span>
                    <span style={{ color: palette.green, fontFamily: 'Menlo' }}>
                        Green
                    </span>
                </Typography>
            </Box>
            <ButtonGroup
                className="buttonsContainer"
                variant="text"
                sx={{
                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                        borderColor: 'transparent'
                    }
                }}
            >
                <CustomButton
                    type='nav'
                    sx={{ color: currPage === 'resume' ? palette.green : palette.passiveText }}
                    onClick={() => navigate('/')}
                >
                    Resume
                </CustomButton>
                <CustomButton
                    type='nav'
                    sx={{ color: currPage === 'portfolio' ? palette.green : palette.passiveText }}
                    onClick={() => navigate('/portfolio')}
                >
                    Portfolio
                </CustomButton>
                <CustomButton
                    type='nav'
                    sx={{ color: currPage === 'contact' ? palette.green : palette.passiveText }}
                    onClick={() => navigate('/contact')}
                >
                    Contact
                </CustomButton>
            </ButtonGroup>
        </Box>
    );
};

export default NavBar;
