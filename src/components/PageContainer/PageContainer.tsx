import { Box } from '@mui/material';
import NavBar from './NavBar';
import LinkedInIcon from '../Icons/LinkedIn';
import { Email, Phone } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import { InfoChip } from '../MicroElements/InfoChip';
import { useTheme } from '../../styles/ThemeContext';
import { useState } from 'react';
import CustomText from '../Text/CustomText';

interface PageContainerProps {
    children: React.ReactNode,
    currPage: string
}

const PageContainer: React.FC<PageContainerProps> = ({ children, currPage }) => {

    const { palette, typography } = useTheme()

    const navigate = useNavigate()

    const [navBarHeight, setNavBarHeight] = useState(80)

    return (
        <Box
            className='horizontallyCenteredColumn'
            sx={{
                width: '100vw',
                height: 'auto',
                minHeight: '100vh',
                overflow: 'auto',
                backgroundColor: palette.background
            }}
        >

            {/* Navigation Bar */}
            <NavBar setNavBarHeight={setNavBarHeight} currPage={currPage} />

            {/* Children Container */}
            <Box
                className='horizontallyCenteredColumn'
                sx={{
                    width: 'clamp(300px, 96vw, 1300px)',
                    height: 'auto',
                    minHeight: `calc(100vh - clamp(50px, 10vw, 120px) - ${navBarHeight}px)`
                }}
            >
                {children}
            </Box>

            {/* Footer */}
            <Box sx={{ width: '100vw', height: 'clamp(50px, 10vw, 120px)', position: 'relative' }}>
                <InfoChip
                    title='Contact Me'
                    placement='right'
                    enterDelay={1000}
                >
                    <Box sx={{
                        height: 'clamp(30px, 7vw, 60px)',
                        width: 'clamp(150px, 35vw, 260px)',
                        position: 'absolute',
                        bottom: 'clamp(5px, 1vw, 16px)',
                        left: 'clamp(5px, 1vw, 16px)',
                        borderLeft: `1px solid ${palette.intenseCustomText}`,
                        borderBottom: `1px solid ${palette.intenseCustomText}`,
                        boxSizing: 'border-box',
                        pl: 'clamp(5px, 1vw, 12px)',
                        pb: 'clamp(5px, 1vw, 12px)',
                        justifyContent: 'flex-end',
                        cursor: 'pointer'
                    }}
                        className='verticallyCenteredColumn'
                        onClick={() => { navigate('/contact') }}>
                        <CustomText type='subContent' className='verticallyCenteredRow'>
                            <Phone size={typography.subContent.fontSize} className='tinyRightMargin' />(262)  305  8482
                        </CustomText>
                        <CustomText type='subContent' className='verticallyCenteredRow'>
                            <Email size={typography.subContent.fontSize} className='tinyRightMargin' />alexgreen0606@gmail.com
                        </CustomText>
                    </Box>
                </InfoChip>
                <Box sx={{
                    width: 'clamp(30px, 6vw, 50px)',
                    position: 'absolute',
                    right: 'clamp(5px, 1vw, 16px)',
                    bottom: 'clamp(5px, 1vw, 16px)',
                    borderRight: `1px solid ${palette.intenseCustomText}`,
                    borderBottom: `1px solid ${palette.intenseCustomText}`,
                    boxSizing: 'border-box',
                    padding: 'clamp(5px, 1vw, 10px)'
                }}
                    className='spacedApart horizontallyCenteredColumn fillHeight'>
                    <Box sx={{ height: '50%', width: '100%' }} />
                    <InfoChip
                        title="LinkedIn"
                        placement="left"
                    >
                        <LinkedInIcon onClickUrl='https://www.linkedin.com/in/alex-g-1076b4122' />
                    </InfoChip>
                </Box>
            </Box>
        </Box>
    )
}

export default PageContainer;