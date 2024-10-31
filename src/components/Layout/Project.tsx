import { Box } from '@mui/material';
import React, { ComponentType, useEffect, useState } from 'react';
import { LogoGithub, Play } from '@carbon/icons-react';
import { readCustomTextToArray } from '../../utils/textUtils';
import { useTheme } from '../../styles/ThemeContext';
import Details from './Details';
import CustomButton from '../Buttons/CustomButton';
import useIsPhoneScreen from '../../hooks/useIsPhoneScreen';
import { getIconSizeStyles } from '../../utils/sizeUtils';
import LoadingDataContainer from '../MicroElements/LoadingDataContainer';
import Card from '../Cards/Card';

interface ProjectProps {
    docsFolder: string
    title: string
    icon: React.ReactNode
    handleClose: () => void
    githubUrl: string
    specialInfo?: React.ReactNode
    demoConfig?: {
        module: React.ReactNode,
        startDemo: () => void,
        demoActive: boolean
    }
    sampleConfig: {
        videoId: string,
        ratio: string
    }
}

const Project: React.FC<ProjectProps> = ({
    docsFolder,
    specialInfo,
    title,
    icon,
    handleClose,
    githubUrl,
    demoConfig,
    sampleConfig
}) => {

    const { palette, theme, typography } = useTheme()

    const [techStackList, setTechStackList] = useState<string[] | undefined>(undefined)
    const [descriptionModule, setDescriptionModule] = useState<{ default?: ComponentType<{}> } | undefined>(undefined)
    const [lessonsList, setLessonsList] = useState<string[] | undefined>(undefined)

    const isPhoneScreen = useIsPhoneScreen(true)

    useEffect(() => {
        const loadProjectInfo = async () => {

            const allProjectFiles = import.meta.glob('../../docs/Projects/*/*');

            const techStackFilePath = `../../docs/Projects/${docsFolder}/techStack.txt`;
            const descriptionFilePath = `../../docs/Projects/${docsFolder}/description.mdx`;
            const lessonsFilePath = `../../docs/Projects/${docsFolder}/lessons.txt`;

            const techStackFile = allProjectFiles[techStackFilePath];
            const descriptionFile = allProjectFiles[descriptionFilePath];
            const lessonsFile = allProjectFiles[lessonsFilePath];

            if (techStackFile) {
                setTechStackList(await readCustomTextToArray(techStackFile));
            }

            if (descriptionFile) {
                const thisDescriptionModule = await descriptionFile() as { default: ComponentType<{}> }
                setDescriptionModule(thisDescriptionModule);
            }

            if (lessonsFile) {
                setLessonsList(await readCustomTextToArray(lessonsFile));
            }
        };

        loadProjectInfo();
    }, [docsFolder]);

    return (
        <LoadingDataContainer
            loadedData={[descriptionModule, lessonsList, techStackList]}
            display={
                <Card
                    title={title}
                    popupCard
                    width='100%'
                    icon={icon}
                    onClose={handleClose}
                >
                    < Box
                        className='fillWidth fillHeight horizontallyCenteredColumn'
                        sx={{ display: 'flex', flexFlow: 'column', boxSizing: 'border-box' }
                        }
                    >

                        {/* Demo Video or Module */}
                        < Box
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
                                <Box
                                    id="Demo-Video"
                                    className="fillWidth horizontallyCenteredRow"
                                    sx={{
                                        position: 'relative',
                                        paddingBottom: sampleConfig.ratio,
                                        height: 0,
                                        overflow: 'hidden',
                                        '& iframe': {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                        }
                                    }}
                                >
                                    <iframe
                                        src={`https://www.youtube.com/embed/${sampleConfig.videoId}?autoplay=1&controls=1&mute=1&loop=1&playlist=${sampleConfig.videoId}&modestbranding=1rel=0`}
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; encrypted-media; fullscreen;"
                                    />
                                </Box>
                            )}
                        </Box >

                        {/* Github Button */}
                        <Box className='verticallyCenteredRow fillWidth standardTopMargin'>
                            <CustomButton
                                type='secondary'
                                size='small'
                                onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
                            >
                                <LogoGithub size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />
                                View The Code
                            </CustomButton>
                        </Box>

                        {/* Special Details */}
                        {
                            specialInfo && (
                                <Box className='fillWidth standardTopMargin'>
                                    {specialInfo}
                                </Box>
                            )
                        }

                        {/* Details */}
                        <Details
                            description={descriptionModule || {}}
                            lessons={lessonsList || []}
                            tech={techStackList || []}
                            noMargins={!!specialInfo}
                        />

                    </Box >
                </Card>
            }
        />

    )
}

export default Project;