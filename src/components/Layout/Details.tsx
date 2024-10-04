import { Box, useMediaQuery } from '@mui/material';
import React, { ComponentType } from 'react';
import MarkdownInterpreter from '../Text/MarkdownInterpreter';
import CustomList from '../MicroElements/CustomList';
import '../../styles/Details.css';
import LabelAndValue from '../MicroElements/LabelAndValue';

interface DetailsProps {
    description: {
        default?: ComponentType<{}>;
    };
    lessons: string[];
    tech: string[];
    noMargins?: boolean;
}

const Details: React.FC<DetailsProps> = ({
    description,
    lessons,
    tech,
    noMargins
}) => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box className={noMargins ? '' : 'standardVerticalMargins'}>
            <LabelAndValue
                label='Summary'
                value={
                    <MarkdownInterpreter markdownModule={description} />
                }
            />
            <Box className='experienceAndTech'>
                <Box className='experience'>
                    <LabelAndValue
                        label='Experience Gained'
                        value={
                            <CustomList items={lessons} />
                        }
                    />
                </Box>
                <Box className='tech'>
                    <LabelAndValue
                        label='Technologies'
                        value={
                            <CustomList doubleColumn={isSmallScreen} dense items={tech} />
                        }
                    />

                </Box>
            </Box>
        </Box>
    );
}

export default Details;