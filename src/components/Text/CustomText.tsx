import { Typography, TypographyProps } from "@mui/material";
import { useTheme } from "../../styles/ThemeContext";

interface CustomTextProps extends TypographyProps {
    type: 'content' | 'header' | 'intenseHeader' | 'label' | 'subContent'
}

const CustomText: React.FC<CustomTextProps> = ({ type, sx, ...props }) => {

    const { typography } = useTheme()

    return <Typography sx={{ ...typography[type], ...sx }} {...props} />;
};

export default CustomText;