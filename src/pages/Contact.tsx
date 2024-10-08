import { Email, Lightning, LogoLinkedin, Phone, SendAlt } from '@carbon/icons-react';
import PageContainer from '../components/PageContainer/PageContainer';
import { Box, Divider } from '@mui/material';
import Headshot from '../images/headshot_contact.jpg'
import Card from '../components/Cards/Card';
import LinkedInIcon from '../components/Icons/LinkedIn';
import { useTheme } from '../styles/ThemeContext';
import ResumeDownloadButton from '../components/Buttons/ResumeDownloadButton';
import '../styles/Contact.css'
import LabelAndValue from '../components/MicroElements/LabelAndValue';
import { useEffect } from 'react';
import CustomButton from '../components/Buttons/CustomButton';
import { getIconSizeStyles } from '../utils/sizeUtils';

const Contact = () => {

    const { palette, typography } = useTheme()

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <PageContainer currPage='contact'>
            <Box className='contactContainer'>
                <Card
                    title='Contact Me'
                    className='contactCard'
                    smallCard
                >
                    <LabelAndValue
                        label='Email'
                        icon={<Email
                            size={typography.label.fontSize}
                            color={palette.passiveText}
                        />}
                        value='alexgreen0606@gmail.com'
                        isCopyButton
                    />
                    <LabelAndValue
                        label='Phone'
                        icon={<Phone
                            size={typography.label.fontSize}
                            color={palette.passiveText}
                        />}
                        value='(262) 305 8482'
                        isCopyButton
                    />
                    <LabelAndValue
                        label='LinkedIn'
                        icon={<LinkedInIcon color={palette.passiveText} />}
                        value='linkedin.com/in/alex-g-1076b4122'
                        isCopyButton
                    />
                    <Box className='standardVerticalMargins fillWidth'>
                        <Divider sx={{
                            backgroundColor: palette.passiveText,
                            width: '100%'
                        }}
                        />
                    </Box>
                    <LabelAndValue
                        label='Quick Links'
                        icon={<Lightning
                            size={typography.label.fontSize}
                            color={palette.passiveText}
                        />
                        }
                        value={
                            <Box className='verticallyCenteredColumn'>
                                <Box className='tinyVerticalMargins'>
                                    <CustomButton
                                        type='secondary'
                                        onClick={() => window.open('https://www.linkedin.com/in/alex-g-1076b4122', '_blank', 'noopener,noreferrer')}
                                        size='small'
                                    >
                                        <LogoLinkedin size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />
                                        View My LinkedIn
                                    </CustomButton>
                                </Box>
                                <ResumeDownloadButton size='small' margins />
                                <Box className='tinyVerticalMargins'>
                                    <CustomButton
                                        type='primary'
                                        onClick={() => window.location.href = 'mailto:alexgreen0606@gmail.com'}
                                        size='small'
                                    >
                                        <SendAlt size={getIconSizeStyles(typography.smallButton.fontSize)} className='tinyRightMargin' />
                                        Email Me
                                    </CustomButton>
                                </Box>
                            </Box>
                        }
                    />
                </Card>
                <Box className='contactCard pageVerticalMargins fullyCenteredRow'>
                    <img
                        src={Headshot}
                        alt='headshot'
                        className='image curved'
                        style={{ boxShadow: `clamp(10px, 5vw, 40px) clamp(10px, 5vw, 40px) clamp(6px, 4vw, 30px) ${palette.shadow}` }}
                    />
                </Box>
            </Box>
        </PageContainer>
    )
}

export default Contact;