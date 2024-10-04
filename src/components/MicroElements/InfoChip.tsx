import { useTheme } from "../../styles/ThemeContext";
import styled from "@emotion/styled";
import { tooltipClasses, Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

export const InfoChip = styled(({ className, ...props }: TooltipProps) => {
  return <MuiTooltip {...props} arrow classes={{ popper: className }} />;
})(() => {

  const { palette, typography } = useTheme();

  return {
    [`& .${tooltipClasses.arrow}`]: {
      color: palette.tooltipBackground
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: palette.tooltipBackground,
      ...typography.subContent,
      color: palette.intenseCustomText
    }
  };
});
