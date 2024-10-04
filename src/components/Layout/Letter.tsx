import { Avatar, Box } from '@mui/material';
import React, { ComponentType, useEffect, useState } from 'react';
import MarkdownInterpreter from '../Text/MarkdownInterpreter';
import Card from '../Cards/Card';
import { Email, LogoLinkedin } from '@carbon/icons-react';
import { useTheme } from '../../styles/ThemeContext';
import '../../styles/Letter.css'
import CustomText from '../Text/CustomText';
import CustomButton from '../Buttons/CustomButton';
import { getIconSizeStyles } from '../../utils/sizeUtils';

interface LetterProps {
    docFolderName: string
    onClose: () => void;
    letterConfig: {
        author: string
        linkedInUrl: string
        authorTitle: string
        date: string
        authorEmail: string
    }
}

const Letter: React.FC<LetterProps> = ({ letterConfig, onClose, docFolderName }) => {

    const { typography } = useTheme()

    const authorName = letterConfig.author.split(' ')[0]

    const [letterContent, setLetterContent] = useState<{ default: ComponentType<{}> } | null>(null)
    const [authorAvatarImagePath, setAuthorAvatarImagePath] = useState<string | null>(null)

    useEffect(() => {
        const fetchPageData = async () => {

            const allWorkFiles = await import.meta.glob(`../../docs/Work/*/*`)

            for (const [path, importFunc] of Object.entries(allWorkFiles)) {
                if (path.includes(docFolderName)) {
                    if (path.includes('letter.mdx')) {
                        const letterModule = await importFunc() as { default: ComponentType<{}> }
                        setLetterContent(letterModule)
                    } else if (path.includes('letter_image.png')) {
                        const letterImageModule = await importFunc() as { default: string }
                        setAuthorAvatarImagePath(letterImageModule.default)
                    }
                }
            }
        }

        fetchPageData()

    }, [])

    if (!letterContent || !authorAvatarImagePath) return

    return (
        <Card title='Letter of Recommendation' onClose={onClose} popupCard={true} width='100%' height='100%'>
            <Box className='horizontallyCenteredColumn fillWidth standardHorizontalPadded'>
                <Box className='authorAndDate' >
                    <Box className='verticallyCenteredRow standardBottomMargin'>
                        <Avatar
                            alt={`${letterConfig.author}-picture`}
                            src={authorAvatarImagePath}
                            className='tinyRightMargin'
                            sx={{ width: 'clamp(40px, 8vw, 80px)', height: 'clamp(40px, 8vw, 80px)' }}
                        />
                        <Box>
                            <CustomText type='label'>{letterConfig.author}</CustomText>
                            <CustomText type='subContent'>{letterConfig.authorTitle}</CustomText>
                        </Box>
                    </Box>
                    <CustomText type='content'>{letterConfig.date}</CustomText>
                </Box>
                <Box className='verticallyCenteredColumn standardVerticalMargins'>
                    <MarkdownInterpreter markdownModule={letterContent} />
                </Box>
                <Box className='verticallyCenteredRow spacedApart fillWidth' sx={{ flexWrap: 'wrap' }}>
                    <Box className='tinyVerticalMargins'>
                        <CustomButton
                            type='secondary'
                            onClick={() => window.open(letterConfig.linkedInUrl, '_blank', 'noopener,noreferrer')}
                            size='small'
                        >
                            <LogoLinkedin size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />
                            View {authorName}'s LinkedIn
                        </CustomButton>
                    </Box>
                    <Box className='tinyVerticalMargins'>
                        <CustomButton
                            type='primary'
                            size='small'
                            onClick={() => window.location.href = `mailto:${letterConfig.authorEmail}`}
                        >
                            <Email size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />
                            Email {authorName}
                        </CustomButton>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default Letter;