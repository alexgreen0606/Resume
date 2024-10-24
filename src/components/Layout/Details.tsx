import { Box } from '@mui/material';
import React, { ComponentType } from 'react';
import MarkdownInterpreter from '../Text/MarkdownInterpreter';
import CustomList from '../MicroElements/CustomList';
import '../../styles/Details.css';
import LabelAndValue from '../MicroElements/LabelAndValue';
import useIsPhoneScreen from '../../hooks/useIsPhoneScreen';

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

    const isSmallScreen = useIsPhoneScreen(false)

    return (
        <Box className={noMargins ? '' : 'standardVerticalMargins'}>
            {/* <LabelAndValue
                label='Summary'
                value={
                    <MarkdownInterpreter markdownModule={description} />
                }
            /> */}
            <Box className='experienceAndTech'>
                <Box className='experience'>
                    <LabelAndValue
                        label='Experience Gained'
                        value={
                            <CustomList columns={1} items={lessons} />
                        }
                    />
                </Box>
                <Box className='tech'>
                    <LabelAndValue
                        label='Technologies'
                        value={
                            <CustomList columns={isSmallScreen ? 2 : 1} items={tech} />
                        }
                    />

                </Box>
            </Box>
        </Box>
    );
}

export default Details;