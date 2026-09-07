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
import { useEffect, useMemo } from 'react';
import useTechStackReader from '../hooks/useTechStackReader';
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
import { workExperience } from '../docs/workExperience';

const Resume = () => {
    const { palette, theme } = useTheme()
    const navigate = useNavigate()

    const skills = useTechStackReader();

    const yearsOfExperience = useMemo(() => {
        const startDate = new Date(2023, 1, 1); // February 2023 (start of professional experience)
        const now = new Date();

        let months = (now.getFullYear() - startDate.getFullYear()) * 12;
        months += now.getMonth() - startDate.getMonth();

        return Math.round(months / 12);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

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
                                    Software Engineer <span style={{ color: palette.neautralCustomText }}>with {yearsOfExperience} years of professional experience!</span>
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
                            {workExperience.map((experience, index) => (
                                <Box className='fillWidth'>
                                    <WorkExperience
                                        role={experience.role}
                                        dates={experience.dates}
                                        docFolderName={experience.docFolderName}
                                        recommendationLetterConfig={experience.recommendationLetterConfig}
                                        curvedBottomEdge={index === (workExperience.length - 1)}
                                    />
                                    {index !== workExperience.length - 1 && (
                                        <Divider sx={{ backgroundColor: palette.passiveText, width: '100%' }} />
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
