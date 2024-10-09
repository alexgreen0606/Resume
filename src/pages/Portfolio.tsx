import { Bot, NoodleBowl, Rocket, User } from '@carbon/icons-react';
import PageContainer from '../components/PageContainer/PageContainer';
import ProjectCard from '../components/Cards/ProjectCard';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../styles/ThemeContext';
import '../styles/Portfolio.css'
import Welcome from '../docs/portfolio.mdx'
import Card from '../components/Cards/Card';
import MarkdownInterpreter from '../components/Text/MarkdownInterpreter';
import { useEffect, useState } from 'react';
import LabelAndValue from '../components/MicroElements/LabelAndValue';
import Toggle from '../components/Buttons/Toggle';
import CustomButton from '../components/Buttons/CustomButton';
import Asteroids from '../docs/Projects/Asteroids/demo/Asteroids';

const Portfolio = () => {

    const { palette, toggleTheme, theme } = useTheme()

    const navigate = useNavigate()

    const [demoActive, setDemoActive] = useState(false)

    const startDemo = () => setDemoActive(true)

    const endDemo = () => setDemoActive(false)

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <PageContainer currPage='portfolio'>
            <Box className='cardsContainer'>
                <Card className='fillWidth pageVerticalMargins'>
                    <MarkdownInterpreter markdownModule={Welcome} />
                </Card>
                <Box className='cards'>
                    <ProjectCard
                        title="Cookbook"
                        onClick={endDemo}
                        docsFolder='Pantry'
                        icon={<NoodleBowl />}
                        titleClass='pantryLogo'
                        githubUrl='https://github.com/alexgreen0606/Cookbook'
                        textColor={palette.orange}
                        technology='Angular / Spring Boot App'
                        sampleConfig={{
                            videoId: 'uR4BIvYTaHI',
                            ratio: '61%'
                        }}
                    />
                    <ProjectCard
                        title="Learning Labyrinth"
                        onClick={endDemo}
                        docsFolder='Maze'
                        technology='React UX'
                        githubUrl='https://github.com/alexgreen0606/Learning-Labyrinth'
                        font='Arial'
                        textColor={palette.blue}
                        icon={<Bot />}
                        sampleConfig={{
                            videoId: 'nUfHPnIClnM',
                            ratio: '61%'
                        }}
                    />
                    <ProjectCard
                        title="Asteroids"
                        onClick={endDemo}
                        icon={<Rocket />}
                        font='asteroids'
                        textColor={palette.yellow}
                        githubUrl='https://github.com/alexgreen0606/Asteroids'
                        docsFolder='Asteroids'
                        technology='React Game'
                        demoConfig={{
                            module:
                                <Asteroids
                                    gameWidth='clamp(1px, 80vw, 900px)'
                                    gameHeight='clamp(240px, 40vw, 500px)'
                                    pauseGame={!demoActive}
                                />,
                            startDemo: startDemo,
                            demoActive: demoActive
                        }}
                        sampleConfig={{
                            videoId: 'D6Py1JXdgxk',
                            ratio: '59%'
                        }}
                    />
                    <ProjectCard
                        title="This App"
                        onClick={endDemo}
                        titleClass='thisAppLogo'
                        docsFolder='ThisApp'
                        technology='React / Vite UX'
                        githubUrl='https://github.com/alexgreen0606/Resume'
                        textColor={palette.green}
                        icon={<User />}
                        specialInfo={
                            <LabelAndValue
                                label='Dark Mode'
                                value={<Toggle onChange={toggleTheme} checked={theme === 'dark'} />}
                            />
                        }
                        sampleConfig={{
                            videoId: 'eZJrKdgLeKs',
                            ratio: '59.6%'
                        }}
                    />
                </Box>
                <Box className='fillWidth' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CustomButton type='primary' size='medium' onClick={() => navigate('/contact')}>
                        Contact Me
                    </CustomButton>
                </Box>
            </Box>
        </PageContainer>
    )
}

export default Portfolio;