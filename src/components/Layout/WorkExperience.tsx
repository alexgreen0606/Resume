import { Box, Dialog, IconButton } from '@mui/material';
import React, { ComponentType, useEffect, useState } from 'react';
import Letter from './Letter';
import { ChevronDown, ChevronUp, Document } from '@carbon/icons-react';
import { readCustomTextToArray } from '../../utils/textUtils';
import { useTheme } from '../../styles/ThemeContext';
import Details from './Details';
import CustomText from '../Text/CustomText';
import CustomButton from '../Buttons/CustomButton';
import { getIconSizeStyles } from '../../utils/sizeUtils';

interface WorkExperienceProps {
    role: string
    dates: string
    docFolderName: string
    recommendationLetterConfig?: {
        author: string
        linkedInUrl: string
        authorTitle: string
        date: string
        authorEmail: string
    }
    curvedBottomEdge?: boolean
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
    role,
    dates,
    docFolderName,
    recommendationLetterConfig,
    curvedBottomEdge
}) => {

    const { palette, typography } = useTheme()

    const [lessons, setLessons] = useState<string[]>([])
    const [tech, setTech] = useState<string[]>([])
    const [description, setDescription] = useState<{ default: ComponentType<{}> } | null>(null)
    const [logo, setLogo] = useState<string | null>(null)

    const [showDetails, setShowDetails] = useState(false)
    const [letterOpen, setLetterOpen] = useState(false)

    useEffect(() => {
        const fetchPageData = async () => {

            const allWorkFiles = await import.meta.glob(`../../docs/Work/*/*`)

            for (const [path, importFunc] of Object.entries(allWorkFiles)) {
                if (path.includes(docFolderName)) {
                    if (path.includes('lessons.txt')) {
                        setLessons(await readCustomTextToArray(importFunc))
                    } else if (path.includes('description.mdx')) {
                        const descriptionModule = await importFunc() as { default: ComponentType<{}> }
                        setDescription(descriptionModule)
                    } else if (path.includes('tech.txt')) {
                        setTech(await readCustomTextToArray(importFunc))
                    } else if (path.includes('logo.png')) {
                        const logoModule = await importFunc() as { default: string }
                        setLogo(logoModule.default)
                    }
                }
            }
        }
        fetchPageData()
    }, [])

    const handleLetterOpen = () => setLetterOpen(true);

    const handleLetterClose = () => setLetterOpen(false);

    const toggleDisplayDetails = () => setShowDetails(!showDetails)

    if (!description || !logo) return

    return (
        <Box>
            <Box
                className={`
                verticallyCenteredRow 
                spacedApart 
                fillWidth 
                ${curvedBottomEdge && !showDetails ? 'bottomCurved' : ''} 
                standardVerticalPadded 
                standardHorizontalPadded`
                }
                onClick={toggleDisplayDetails}
                sx={{
                    cursor: 'pointer', '&:hover': {
                        backgroundColor: palette.highlightgrey
                    }
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex' }}>
                        <img
                            src={logo}
                            alt='company-logo'
                            className='tinyBottomMargin'
                            style={{ height: 'clamp(20px, 4.2vw, 35px)' }}
                        />
                    </Box>
                    <Box>
                        <CustomText type='content'>
                            {dates}
                        </CustomText>
                        <CustomText type='subContent'>
                            {role}
                        </CustomText>
                    </Box>
                </Box>
                <IconButton>
                    {!showDetails ? (
                        <ChevronUp size={typography.label.fontSize} color={palette.passiveText} />
                    ) : (
                        <ChevronDown size={typography.label.fontSize} color={palette.passiveText} />
                    )}
                </IconButton>
            </Box>
            {showDetails && (
                <Box className='standardBottomPadded standardHorizontalPadded'>
                    <Details
                        description={description}
                        lessons={lessons}
                        tech={tech}
                    />
                    {recommendationLetterConfig && (
                        <Box
                            className='fillWidth'
                            sx={{ display: 'flex', justifyContent: 'flex-end' }
                            }>
                            <CustomButton
                                type='secondary'
                                className='verticallyCenteredRow'
                                onClick={handleLetterOpen}
                                size='small'
                            >
                                <Document
                                    size={getIconSizeStyles(typography.smallButton.fontSize)}
                                    className='tinyRightMargin'
                                />
                                View Letter of Recommendation
                            </CustomButton>
                            <Dialog
                                open={letterOpen}
                                onClose={handleLetterClose}
                                maxWidth="lg"
                                fullWidth
                                PaperProps={{ className: 'curved', sx: { backgroundColor: palette.card } }}
                            >
                                <Letter
                                    onClose={handleLetterClose}
                                    letterConfig={recommendationLetterConfig}
                                    docFolderName={docFolderName}
                                />
                            </Dialog>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    )
}

export default WorkExperience;