import { List, ListItem, Box } from '@mui/material';
import React from 'react';
import { SquareFill } from '@carbon/icons-react';
import { useTheme } from '../../styles/ThemeContext';
import CustomText from '../Text/CustomText';

interface CustomListProps {
    items: string[] | React.ReactNode[] | undefined;
    columns?: number;
    centerText?: boolean;
}

const CustomList: React.FC<CustomListProps> = ({ items, columns = 1, centerText }) => {

    const { palette } = useTheme();

    // If the string has a colon, bold the words preceding the colon and return the new string. 
    // Otherwise, just return the string
    const renderString = (content: string) => {
        if (content.includes(':')) {
            const parsedContent = content.split(':');
            const label = parsedContent[0];
            const value = parsedContent[1];
            return (
                <span>
                    <strong style={{ color: palette.passiveText }}>{label}</strong>:{value}
                </span>
            );
        } else {
            return content;
        }
    };

    const renderListItems = (listItems: string[] | React.ReactNode[]) => (
        <List sx={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
            {listItems.map((item, index) => (
                <ListItem
                    key={`${index}-item-${item}`}
                    disablePadding
                    className='standardBottomPadded'
                    sx={{
                        width: `${100 / columns}%`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: centerText ? 'center' : 'flex-start',
                        textAlign: centerText ? 'center' : 'left'
                    }}
                >
                    {typeof item === 'string' ? (
                        <>
                            <SquareFill
                                color={palette.passiveText}
                                size='clamp(6px, 1.5vw, 10px)'
                                style={{ position: 'absolute', top: 'clamp(3px, 1vw, 8px)' }}
                            />
                            <CustomText type='content' sx={{ marginLeft: 'clamp(12px, 3vw, 20px)' }}>
                                {renderString(item)}
                            </CustomText>
                        </>
                    ) : (
                        item
                    )}
                </ListItem>
            ))}
        </List>
    );

    if (!items) return null;

    return (
        <Box className='fillWidth'>
            {renderListItems(items)}
        </Box>
    );
}

export default CustomList;
