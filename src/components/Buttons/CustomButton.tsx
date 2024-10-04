import { alpha, Button, ButtonProps, darken, SxProps, Theme } from "@mui/material";
import { Typography, useTheme } from "../../styles/ThemeContext";
import { getButtonSizeStyles } from "../../utils/sizeUtils";
import { Palette } from "../../styles/palette";

const getPrimaryButtonStyles = (palette: Palette) => {
    return {
        backgroundColor: palette.green,
        color: palette.background,
        fontFamily: 'Menlo',
        letterSpacing: 0,
        zIndex: 99,
        textTransform: 'none',
        boxSizing: 'border-box',
        '&:hover': {
            backgroundColor: darken(palette.green, 0.2),
        }
    }
}

const getSecondaryButtonStyles = (palette: Palette) => {
    return {
        backgroundColor: 'transparent',
        color: palette.green,
        border: `1px solid ${palette.green}`,
        borderColor: palette.green,
        fontFamily: 'Menlo',
        letterSpacing: 0,
        textTransform: 'none',
        boxSizing: 'border-box',
        '&:hover': {
            backgroundColor: alpha(palette.green, 0.2),
        }
    }
}

const getNavButtonStyles = (palette: Palette, typography: Typography) => {
    return {
        ...typography.navButton,
        backgroundColor: 'transparent',
        color: palette.passiveText,
        fontFamily: 'Menlo',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'transparent',
            color: palette.green
        }
    }
}

const getButtonStyles = (type: string, palette: Palette, typography: Typography) => {
    switch (type) {
        case 'primary':
            return getPrimaryButtonStyles(palette)
        case 'secondary':
            return getSecondaryButtonStyles(palette)
        case 'nav':
            return getNavButtonStyles(palette, typography)
        default:
            return {}
    }
}

interface CustomButtonProps extends Omit<ButtonProps, 'type'> {
    type: 'primary' | 'secondary' | 'nav'
    size?: 'small' | 'medium' | 'large';
    sx?: SxProps<Theme>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    type,
    sx,
    size,
    ...props }) => {

    const { palette, typography } = useTheme()

    const buttonStyles = getButtonStyles(type, palette, typography)

    const buttonSize = getButtonSizeStyles(size, typography)

    return (
        <Button
            {...props}
            sx={{
                ...buttonStyles,
                ...buttonSize,
                ...sx
            }}
        />
    );
};

export default CustomButton;