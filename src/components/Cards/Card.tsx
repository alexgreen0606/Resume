import { Box, IconButton, SxProps } from '@mui/material';
import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { Close } from '@carbon/icons-react';
import { InfoChip } from '../MicroElements/InfoChip';
import CustomText from '../Text/CustomText';
import { getIconSizeStyles } from '../../utils/sizeUtils';

interface CardProps {
    title?: string | React.ReactNode,
    icon?: React.ReactNode,
    children?: React.ReactNode,
    popupCard?: boolean,
    width?: string,
    height?: string,
    sx?: SxProps
    smallCard?: boolean,
    noMargins?: boolean,
    noPadding?: boolean,
    onClose?: () => void
    className?: string
}

const Card: React.FC<CardProps> = ({
    title,
    icon,
    children,
    width,
    onClose,
    noPadding,
    smallCard,
    noMargins,
    height,
    popupCard,
    className,
    sx
}) => {

    const { palette, typography } = useTheme()

    return (
        <Box className={`${popupCard ? '' : noMargins ? '' : 'pageVerticalMargins'} curved ${className}`}
            sx={{
                ...sx,
                width,
                height,
                backgroundColor: palette.card,
                boxShadow: `clamp(10px, 5vw, 40px) clamp(10px, 5vw, 40px) clamp(6px, 4vw, 30px) ${palette.shadow}`,
            }}
        >
            <Box className={`verticallyCenteredRow spacedApart fillWidth tinyHorizontalPadded ${noPadding ? '': 'standardBottomPadded'}`}>
                {title && (
                    <Box className='tinyVerticalMargins verticallyCenteredColumn'>
                        <Box className="verticallyCenteredRow">
                            <CustomText
                                type='header'
                                className='verticallyCenteredRow'
                                sx={{ color: palette.intenseCustomText, position: 'relative' }}
                            >
                                {icon && React.cloneElement(icon as React.ReactElement, {
                                    className: 'tinyRightMargin',
                                    color: palette.passiveText,
                                    size: typography.header.fontSize
                                })}
                                {title}
                            </CustomText>
                        </Box>
                        <Box sx={{
                            backgroundColor: palette.green,
                            width: 'clamp(40px, 8vw, 80px)',
                            height: 'clamp(1px, .2vw, 2px)'
                        }}
                        />
                    </Box>
                )}
                {onClose && (
                    <InfoChip
                        title='Close'
                        placement='left'
                        enterDelay={1000}
                    >
                        <IconButton onClick={onClose}>
                            <Close color={palette.passiveText} size={getIconSizeStyles(typography.content.fontSize)} />
                        </IconButton>
                    </InfoChip>
                )}
            </Box>
            <Box className={`
                ${!noPadding ? 'standardBottomPadded ' : ''} 
                ${!noPadding && smallCard ? 'standardHorizontalPadded ' : ''}
                ${!noPadding && !smallCard ? 'largeHorizontalPadded ' : ''} 
                fillWidth fillHeight
            `}>
                {children}
            </Box>
        </Box>
    )
}

export default Card;