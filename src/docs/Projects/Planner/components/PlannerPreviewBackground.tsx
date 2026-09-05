import { Box } from "@mui/material";
import { useTheme } from "../../../../styles/ThemeContext";
import '../../../../styles/PlannerPreviewBackground.css'

const PlannerPreviewBackground = () => {

    const { palette } = useTheme()

    const BindingPill = () => (
        <Box className='bindingPillContainer'>
            <Box className='bindingPill' />
            <Box
                className='bindingPillHole'
                sx={{ backgroundColor: palette.background }}
            />
        </Box>
    )

    return (
        <Box className='container fillWidth fillHeight'>
            <Box
                className='binding fillHeight absolute'
                sx={{ backgroundColor: palette.plannerBlue }}
            >
                <BindingPill />
                <BindingPill />
                <BindingPill />
                <BindingPill />
                <BindingPill />
            </Box>
        </Box>
    );
};

export default PlannerPreviewBackground;
