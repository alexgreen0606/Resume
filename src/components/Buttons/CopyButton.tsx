import { Box, lighten } from "@mui/material";
import { InfoChip } from "../MicroElements/InfoChip";
import { useCallback, useState } from "react";
import { Checkmark } from "@carbon/icons-react";
import { useTheme } from "../../styles/ThemeContext";
import CustomText from "../Text/CustomText";
import { getIconSizeStyles } from "../../utils/sizeUtils";

const CopyButtonWithTooltip = ({ label }: { label: string }) => {

    const { palette, typography } = useTheme()

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleClick = useCallback(() => {
        setTooltipOpen(true);
        navigator.clipboard.writeText(label);
        setTimeout(() => setTooltipOpen(false), 2000);
    }, [label]);

    return (
        <InfoChip
            title='Copy'
            placement='right'
        >
            <Box sx={{ width: 'fit-content' }}>
                <InfoChip
                    title={
                        <Box className='verticallyCenteredRow'>
                            Copied
                            <Checkmark color={palette.green} size={typography.subContent.fontSize} className='tinyLeftMargin' />
                        </Box>
                    }
                    placement="right"
                    open={tooltipOpen}
                >
                    <Box onClick={handleClick} className='verticallyCenteredRow'>
                        <CustomText type='content' sx={{
                            '&:hover': {
                                color: lighten(palette.passiveText, 0.5)
                            },
                            cursor: 'pointer'
                        }}>
                            {label}
                        </CustomText>
                    </Box>
                </InfoChip>
            </Box>
        </InfoChip>
    );
};

export default CopyButtonWithTooltip;
