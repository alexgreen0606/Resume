import { Box, Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Project from '../Layout/Project';
import Card from './Card';
import { useTheme } from '../../styles/ThemeContext';
import CustomText from '../Text/CustomText';
import '../../styles/ProjectCard.css'

interface CardProps {
    title: string
    docsFolder: string
    technology: string
    icon: React.ReactNode
    font?: string
    textColor: string
    onClick: () => void
    titleClass?: string
    githubUrl: string
    specialInfo?: React.ReactNode
    demoConfig?: {
        module: React.ReactNode
        startDemo:  () => void
        demoActive: boolean
    }
    sampleConfig: {
        videoId: string,
        ratio: string
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
    font,
    icon,
    technology,
    sampleConfig
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
        const getImage = async () => {
            const image = await import(`../../docs/Projects/${docsFolder}/sample.png`)
            setProjImagePath(image.default)
        }
        getImage()
    }, [])

    if (!projImagePath) return

    return (
        <Box>
            <Box
                className='pageVerticalMargins horizontalMargins card curved'
                sx={{
                    backgroundImage: `url(${projImagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    boxShadow: `clamp(10px, 5vw, 40px) clamp(10px, 5vw, 40px) clamp(6px, 4vw, 30px) ${palette.shadow}`,
                    transition: 'all 0.5s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.07)'
                    }
                }}
                onClick={handleClickOpen}>
                <Box className="fullyCenteredColumn fillHeight" sx={{ textAlign: 'center' }}>
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
                PaperProps={{ sx: { backgroundColor: palette.card, width: 'clamp(300px, 96vw, 1300px)' } }}
            >
                <Card
                    title={title}
                    popupCard
                    width='100%'
                    icon={icon}
                    onClose={handleClose}
                >
                    <Project
                        docsFolder={docsFolder}
                        demoConfig={demoConfig}
                        specialInfo={specialInfo}
                        githubUrl={githubUrl}
                        sampleConfig={sampleConfig}
                    />
                </Card>
            </Dialog>
        </Box>
    )
}

export default ProjectCard; 