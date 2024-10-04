import { Switch, SwitchProps } from "@mui/material";
import { useTheme } from "../../styles/ThemeContext";

const Toggle: React.FC<SwitchProps> = (props: SwitchProps) => {

    const { palette } = useTheme()

    return (
        <Switch
            {...props}
            sx={{
                width: 'clamp(35px, 6vw, 45px)',
                height: 'clamp(19.44px, 3.33vw, 25px)',
                padding: 0,
                '& .MuiSwitch-switchBase': {
                    padding: '2px',
                    transitionDuration: '300ms',
                    color: palette.card,
                    '&.Mui-checked': {
                        transform: 'translateX(calc(clamp(19.44px, 3.33vw, 25px) - 4px))',
                        color: palette.card,
                        '& + .MuiSwitch-track': {
                            backgroundColor: palette.green,
                            opacity: 1,
                            border: 0
                        }
                    },
                },
                '& .MuiSwitch-thumb': {
                    boxSizing: 'border-box',
                    width: 'calc(clamp(19.44px, 3.33vw, 25px) - 4px)',
                    height: 'calc(clamp(19.44px, 3.33vw, 25px) - 4px)',
                },
                '& .MuiSwitch-track': {
                    borderRadius: 26 / 2,
                    backgroundColor: palette.passiveText,
                    opacity: 1
                },
            }}
        />
    );
};

export default Toggle;
