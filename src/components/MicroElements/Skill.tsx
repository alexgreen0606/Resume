import { Box } from '@mui/material';
import React from 'react';
import CustomText from '../Text/CustomText';

interface SkillProps {
    title: string,
    strength: number
}

const Skill: React.FC<SkillProps> = ({ title }) => {

    return (
        <Box className='fillWidth horizontallyCenteredColumn'>
            <Box
                className="verticallyCenteredColumn"
                sx={{ width: '80%' }}
            >
                <CustomText type='content'>
                    {title}
                </CustomText>
                {/* <Slider
                    disabled
                    value={strength}
                    sx={{
                        color: palette.green,
                        height: "2px",
                        width: '100%',
                        "& .MuiSlider-thumb": {
                            display: "none",
                        },
                        "&.Mui-disabled": {
                            color: palette.green
                        },
                    }} /> */}
            </Box>
        </Box>
    );
}

export default Skill;
