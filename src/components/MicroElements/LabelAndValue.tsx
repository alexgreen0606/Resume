import { Box } from '@mui/material';
import React from 'react';
import CopyButtonWithTooltip from '../Buttons/CopyButton';
import { useTheme } from '../../styles/ThemeContext';
import CustomText from '../Text/CustomText';

interface LabelAndValueProps {
    label: string,
    value: string | React.ReactNode,
    icon?: React.ReactNode,
    isCopyButton?: boolean
}

const LabelAndValue: React.FC<LabelAndValueProps> = ({
    label,
    value,
    icon,
    isCopyButton
}) => {

    const { typography } = useTheme()

    return (
        <Box className='standardBottomMargin'>
            <CustomText type='label' className='verticallyCenteredRow'>
                {icon && (
                    <Box className='tinyRightMargin fillHeight verticallyCenteredColumn' sx={{ width: typography.label.fontSize }}>
                        {icon}
                    </Box>
                )}
                {label}
            </CustomText>
            {isCopyButton && typeof (value) === 'string' ? (
                <CopyButtonWithTooltip label={value} />
            ) : (
                value
            )}
        </Box>
    );
}

export default LabelAndValue;
