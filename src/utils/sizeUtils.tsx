import { Typography } from "../styles/ThemeContext";

export const getButtonSizeStyles = (size: string | undefined, typography: Typography) => {
    switch (size) {
        case 'small':
            return {
                fontSize: typography.smallButton.fontSize,
                borderRadius: 'clamp(20px, 50vw, 30px)',
                padding: '5px clamp(12px, 3vw, 20px)'
            };
        case 'medium':
            return {
                fontSize: typography.button.fontSize,
                borderRadius: 'clamp(20px, 50vw, 30px)',
                padding: '5px clamp(12px, 3vw, 20px)'
            };
        default:
            return {}
    }
};

export const getIconSizeStyles = (size: string | number | undefined) => `calc(${size} * 1.4)`