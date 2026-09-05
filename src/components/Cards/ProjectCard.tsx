import { Box, Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Project from '../Layout/Project';
import { useTheme } from '../../styles/ThemeContext';
import CustomText from '../Text/CustomText';
import '../../styles/ProjectCard.css'
import LoadingDataContainer from '../MicroElements/LoadingDataContainer';

interface CardProps {
    title: string
    docsFolder: string
    technology: string
    icon: React.ReactNode
    titleLeftPadding?: string;
    font?: string
    textColor: string
    onClick: () => void
    titleClass?: string
    githubUrl: string
    specialInfo?: React.ReactNode
    background?: React.ReactNode
    demoConfig?: {
        module: React.ReactNode
        startDemo: () => void
        demoActive: boolean
    }
    sampleConfig?: {
        videoId: string,
        ratio: string
    }
    appStoreConfig?: {
        url: string
    }
}

const ProjectCard: React.FC<CardProps> = ({
    title,
    titleClass,
    docsFolder,
    specialInfo,
    githubUrl,
    onClick,
    demoConfig,
    textColor,
    titleLeftPadding,
    font,
    icon,
    technology,
    background,
    sampleConfig,
    appStoreConfig
}) => {

    const { palette } = useTheme()

    const [projImagePath, setProjImagePath] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        onClick();
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (background) {
            return
        }

        const getImage = async () => {
            const image = await import(`../../docs/Projects/${docsFolder}/sample.png`)
            setProjImagePath(image.default)
        }
        getImage()
    }, [background, docsFolder])

    return (
        <LoadingDataContainer
            loadedData={[background ? 'background' : projImagePath]}
            display={
                <Box className='card pageVerticalMargins horizontallyCenteredColumn'>
                    <Box
                        className='fillWidth horizontalMargins card curved'
                        sx={{
                            backgroundImage: background ? 'none' : `url(${projImagePath})`,
                            overflow: 'hidden',
                            backgroundSize: 'cover',
                            position: 'relative',
                            backgroundPosition: 'bottom',
                            boxShadow: `clamp(10px, 5vw, 40px) clamp(10px, 5vw, 40px) clamp(6px, 4vw, 30px) ${palette.shadow}`,
                            transition: 'all 0.5s ease-in-out',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.07)',
                            }
                        }}
                        onClick={handleClickOpen}>
                        {background && (
                            <Box
                                aria-hidden='true'
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    pointerEvents: 'none',
                                    zIndex: 0,
                                }}
                            >
                                {background}
                            </Box>
                        )}
                        <Box className="fullyCenteredColumn fillHeight" sx={{ position: 'relative', textAlign: 'center', zIndex: 1, paddingLeft: titleLeftPadding }}>
                            <CustomText
                                type='intenseHeader'
                                sx={{ color: textColor, fontFamily: font }}
                                className={titleClass}
                            >
                                {title}
                            </CustomText>
                            <CustomText type='content' sx={{ color: palette.projectType }}>
                                {technology}
                            </CustomText>
                        </Box>
                    </Box>
                    <Dialog
                        open={dialogOpen}
                        onClose={handleClose}
                        maxWidth={false}
                        PaperProps={{ sx: { backgroundColor: palette.card, width: 'clamp(290px, 93vw, 1280px)' } }}
                    >
                        <Project
                            title={title}
                            icon={icon}
                            handleClose={handleClose}
                            docsFolder={docsFolder}
                            demoConfig={demoConfig}
                            specialInfo={specialInfo}
                            githubUrl={githubUrl}
                            sampleConfig={sampleConfig}
                            appStoreConfig={appStoreConfig}
                        />
                    </Dialog>
                </Box>
            }
        />
    )
}

export default ProjectCard; 
