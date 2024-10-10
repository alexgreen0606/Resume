import Headshot from '../images/headshot_resume.jpg'
import PageContainer from '../components/PageContainer/PageContainer';
import { Box, Divider } from '@mui/material'
import Skill from '../components/MicroElements/Skill';
import Wisconsin from '../images/wisconsin.png'
import WisconsinLight from '../images/wisconsin-name-light.svg'
import Madison from '../images/wisconsin-name.png'
import WisconsinCrest from '../images/crest.png'
import Card from '../components/Cards/Card';
import { Education, Portfolio, SkillLevel } from '@carbon/icons-react';
import CustomList from '../components/MicroElements/CustomList';
import { useEffect, useState } from 'react';
import { readCustomTextToArray } from '../utils/textUtils';
import WorkExperience from '../components/Layout/WorkExperience';
import { useNavigate } from 'react-router-dom';
import MarkdownInterpreter from '../components/Text/MarkdownInterpreter';
import { useTheme } from '../styles/ThemeContext';
import ResumeDownloadButton from '../components/Buttons/ResumeDownloadButton';
import Synopsis from '../docs/synopsis.mdx'
import '../styles/Resume.css'
import CustomText from '../components/Text/CustomText';
import CustomButton from '../components/Buttons/CustomButton';
import LoadingDataContainer from '../components/MicroElements/LoadingDataContainer';

const workExperiences = [
    {
        role: 'UX Developer',
        dates: 'February 2024 - Current',
        docFolderName: 'Medtronic',
        recommendationLetterConfig: {
            author: 'Brian Nelb',
            linkedInUrl: 'https://www.linkedin.com/in/brian-nelb-011413191/',
            authorTitle: 'Medtronic Product Owner',
            authorEmail: 'brian.nelb@medtronic.com ',
            date: 'September 10, 2024'
        }
    },
    {
        role: 'Full Stack Software Engineer',
        dates: 'February 2023 - August 2023',
        docFolderName: 'Optum'
    }
]

const Resume = () => {

    const { palette, theme } = useTheme()

    const navigate = useNavigate()

    const [skills, setSkills] = useState<{ title: string, strength: number }[] | undefined>(undefined)

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        const fetchPageData = async () => {

            const strengthStrings = await readCustomTextToArray(() => import('../docs/strengths.txt'))
            const strengthMap = strengthStrings.map(
                strength => ({ title: strength.split(' ')[0].replace(/_/g, ' '), strength: Number(strength.split(' ')[1]) }))
            setSkills(strengthMap)

        }

        fetchPageData()

    }, [])

    return (
        <LoadingDataContainer
            loadedData={[skills]}
            display={
                <PageContainer currPage='resume'>

                    {/* Welcome Message and Photo */}
                    <Box className='welcome'>
                        <Box className='welcomeMessage standardHorizontalPadded'>
                            <CustomText type='intenseHeader' sx={{ color: palette.intenseCustomText }}>
                                <CustomText type='content' sx={{ color: palette.passiveText }}>
                                    Hello, I'm a{' '}
                                </CustomText>
                                <span style={{ color: palette.green, lineHeight: 'clamp(16px, 4vw, 48px)', display: 'inline-block' }}>
                                    Software Engineer <span style={{ color: palette.neautralCustomText }}>with 6 years of coding experience!</span>
                                </span>
                            </CustomText>
                            <MarkdownInterpreter markdownModule={Synopsis} />
                            <Box className='pageVerticalMargins'>
                                <CustomButton type='secondary' size='medium' onClick={() => navigate('/contact')}>Contact Me</CustomButton>
                            </Box>
                        </Box>
                        <Box className='fullyCenteredColumn welcomeImage pageVerticalMargins'>
                            <img
                                className='curved'
                                src={Headshot}
                                alt='headshot'
                                style={{
                                    boxShadow: `clamp(10px, 5vw, 40px) clamp(10px, 5vw, 40px) clamp(6px, 4vw, 30px) ${palette.shadow}`,
                                    height: 'clamp(250px, 40vw, 600px)'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Work Experience */}
                    <Card title='Professional Experience' noPadding icon={<Portfolio />} className='fillWidth'>
                        <Box>
                            {workExperiences.map((experience, index) => (
                                <Box className='fillWidth'>
                                    <WorkExperience
                                        role={experience.role}
                                        dates={experience.dates}
                                        docFolderName={experience.docFolderName}
                                        recommendationLetterConfig={experience.recommendationLetterConfig}
                                        curvedBottomEdge={index === (workExperiences.length - 1)}
                                    />
                                    {index !== workExperiences.length - 1 && (
                                        <Box className='fillWidth'>
                                            <Divider sx={{ backgroundColor: palette.passiveText, width: '100%' }} />
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Card>

                    {/* Education and Skills */}
                    <Box className="educationAndSkills">
                        <Card
                            title="Education"
                            icon={<Education />}
                            noMargins
                            className='educationAndSkillsChild fillWidth'
                        >
                            <Box className='horizontallyCenteredColumn fillHeight'>
                                <Box className='horizontallyCenteredColumn'>
                                    {theme === 'dark' ? (
                                        <Box className='horizontallyCenteredColumn' sx={{ width: '90%' }}>
                                            <img src={WisconsinCrest} className='tinyBottomMargin' alt="madison-crest" width='15%' />
                                            <Box className='horizontallyCenteredColumn fillWidth'>
                                                <img src={Wisconsin} alt="wisconsin" width='100%' style={{ marginBottom: '15px' }} />
                                                <img src={Madison} alt="madison" width='100%' />
                                            </Box>
                                        </Box>
                                    ) : (
                                        <img src={WisconsinLight} alt="wisconsin-light" width='100%' style={{ marginBottom: '15px' }} />
                                    )}
                                </Box>
                                <Box className='standardVerticalMargins' sx={{ textAlign: 'center' }}>
                                    <CustomText type='label'>
                                        Bachelor of Computer Science
                                    </CustomText>
                                </Box>
                                <CustomText type='content' sx={{ textAlign: 'center' }}>
                                    August 2018 - December 2023
                                </CustomText>
                            </Box>
                        </Card>
                        <Card
                            title="Skills"
                            noMargins
                            smallCard
                            icon={<SkillLevel />}
                            className='educationAndSkillsChild'
                        >
                            <CustomList
                                items={
                                    skills?.map((strength: { strength: number, title: string }) =>
                                        <Skill title={strength.title} strength={strength.strength} />
                                    )
                                }
                                columns={3}
                            />
                        </Card>
                    </Box >

                    {/* Resume Download and Portfolio Buttons */}
                    <Box className='fillWidth verticallyCenteredRow spacedApart' sx={{ flexWrap: 'wrap' }}>
                        <Box className='tinyVerticalMargins'>
                            <ResumeDownloadButton />
                        </Box>
                        <Box className='tinyVerticalMargins'>
                            <CustomButton type='primary' size='medium' onClick={() => navigate('/portfolio')}>
                                View Portfolio
                            </CustomButton>
                        </Box>
                    </Box>
                </PageContainer >
            }
        />
    )
}

export default Resume;