import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

interface IconWithTextProps {
    text: string;
    IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    color: string;
}

const IconWithTextField: React.FC<IconWithTextProps> = ({ text, IconComponent, color }) => {
    return (
        <Box display="flex" alignItems="center" marginBottom={2}>
            <Avatar sx={{ bgcolor: color, marginRight: 1 }}>
                <IconComponent fontSize="small" />
            </Avatar>
            <Typography variant="body1">{text}</Typography>
        </Box>
    );
};

export default IconWithTextField;