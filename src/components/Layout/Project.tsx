import { Box } from '@mui/material';
import React, { ComponentType, useEffect, useState } from 'react';
import { LogoGithub, Play } from '@carbon/icons-react';
import { readCustomTextToArray } from '../../utils/textUtils';
import { useTheme } from '../../styles/ThemeContext';
import Details from './Details';
import CustomButton from '../Buttons/CustomButton';
import useIsPhoneScreen from '../../hooks/useIsPhoneScreen';
import { getIconSizeStyles } from '../../utils/sizeUtils';

interface ProjectProps {
    docsFolder: string
    githubUrl: string
    specialInfo?: React.ReactNode
    demoConfig?: {
        module: React.ReactNode,
        startDemo: () => void,
        demoActive: boolean
    }
}

const Project: React.FC<ProjectProps> = ({
    docsFolder,
    specialInfo,
    githubUrl,
    demoConfig,
}) => {

    const { palette, theme, typography } = useTheme()

    const [techStackList, setTechStackList] = useState<string[]>([])
    const [descriptionModule, setDescriptionModule] = useState<{ default: ComponentType<{}> } | null>(null)
    const [lessonsList, setLessonsList] = useState<string[]>([])
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    const isPhoneScreen = useIsPhoneScreen()

    useEffect(() => {
        const loadProjectInfo = async () => {

            const allProjectFiles = import.meta.glob('../../docs/Projects/*/*');

            const techStackFilePath = `../../docs/Projects/${docsFolder}/techStack.txt`;
            const descriptionFilePath = `../../docs/Projects/${docsFolder}/description.mdx`;
            const videoFilePath = `../../docs/Projects/${docsFolder}/demo.mp4`;
            const lessonsFilePath = `../../docs/Projects/${docsFolder}/lessons.txt`;

            const techStackFile = allProjectFiles[techStackFilePath];
            const descriptionFile = allProjectFiles[descriptionFilePath];
            const videoFile = allProjectFiles[videoFilePath];
            const lessonsFile = allProjectFiles[lessonsFilePath];

            if (techStackFile) {
                setTechStackList(await readCustomTextToArray(techStackFile));
            }

            if (descriptionFile) {
                const thisDescriptionModule = await descriptionFile() as { default: ComponentType<{}> }
                setDescriptionModule(thisDescriptionModule);
            }

            if (videoFile) {
                const videoModule = await videoFile() as { default: string }
                setVideoSrc(videoModule.default);
            }

            if (lessonsFile) {
                setLessonsList(await readCustomTextToArray(lessonsFile));
            }
        };

        loadProjectInfo();
    }, [docsFolder]);

    if (!descriptionModule || !videoSrc) return

    return (
        <Box
            className='fillWidth fillHeight horizontallyCenteredColumn'
            sx={{ display: 'flex', flexFlow: 'column', boxSizing: 'border-box' }}
        >

            {/* Demo Video or Module */}
            <Box
                className='horizontallyCenteredColumn'
                sx={{ position: 'relative', width: 'clamp(1px, 100%, 900px)' }}
            >
                {demoConfig && !isPhoneScreen ? (
                    <Box className='fullyCenteredColumn'>
                        {demoConfig.module}
                        {!demoConfig.demoActive && (
                            <Box
                                className='fillWidth fillHeight fullyCenteredColumn'
                                sx={{ position: 'absolute', top: 0, zIndex: 1000 }}
                            >
                                {theme === 'dark' && (
                                    <Box sx={{
                                        opacity: .5,
                                        backgroundColor: palette.background,
                                        position: 'absolute',
                                        top: 0,
                                        width: 'clamp(1px, 80vw, 900px)',
                                        height: 'clamp(240px, 40vw, 500px)'
                                    }} />
                                )}
                                <CustomButton
                                    type='secondary'
                                    size='small'
                                    onClick={() => demoConfig.startDemo()}
                                >
                                    <Play size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />Try it out
                                </CustomButton>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <video width='100%' autoPlay loop controls>
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the demo video tag.
                    </video>
                )}
            </Box>

            {/* Special Details */}
            {specialInfo && (
                <Box className='fillWidth standardTopMargin'>
                    {specialInfo}
                </Box>
            )}

            {/* Details */}
            <Details
                description={descriptionModule}
                lessons={lessonsList}
                tech={techStackList}
                noMargins={!!specialInfo}
            />

            {/* Github Button */}
            <Box className='verticallyCenteredRow fillWidth' sx={{ justifyContent: 'flex-end' }}>
                <CustomButton
                    type='secondary'
                    size='small'
                    onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
                >
                    <LogoGithub size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />
                    View The Code
                </CustomButton>
            </Box>
        </Box>
    )
}

export default Project;