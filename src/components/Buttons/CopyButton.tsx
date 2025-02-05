import { Box, lighten } from "@mui/material";
import { InfoChip } from "../MicroElements/InfoChip";
import { useCallback, useEffect, useState } from "react";
import { Checkmark } from "@carbon/icons-react";
import { useTheme } from "../../styles/ThemeContext";
import CustomText from "../Text/CustomText";

const CopyButtonWithTooltip = ({ label }: { label: string }) => {

    const { palette, typography } = useTheme()

    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        if (tooltipOpen) {
            const timer = setTimeout(() => setTooltipOpen(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [tooltipOpen]);

    const handleClick = useCallback(() => {
        setTooltipOpen(true);
        navigator.clipboard.writeText(label);
    }, [label]);

    return (
        <InfoChip
            title={
                <CustomText type="content">
                    Copy
                </CustomText>
            }
            placement='right'
        >
            <Box sx={{ width: 'fit-content' }}>
                <InfoChip
                    title={
                        <CustomText type="content" className='verticallyCenteredRow'>
                            Copied
                            <Checkmark color={palette.green} size={typography.subContent.fontSize} className='tinyLeftMargin' />
                        </CustomText>
                    }
                    placement="right"
                    open={tooltipOpen}
                >
                    <Box onClick={handleClick} className='verticallyCenteredRow'>
                        <CustomText
                            type='content'
                            sx={{
                                '&:hover': {
                                    color: lighten(palette.passiveText, 0.5)
                                },
                                cursor: 'pointer'
                            }}
                        >
                            {label}
                        </CustomText>
                    </Box>
                </InfoChip>
            </Box>
        </InfoChip>
    );
};

export default CopyButtonWithTooltip;
