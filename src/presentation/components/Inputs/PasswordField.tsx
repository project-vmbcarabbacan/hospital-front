import React from 'react';
import {
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type Props = {
    value: string;
    name: string;
    id: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
};

const PasswordField: React.FC<Props> = ({
    value,
    name,
    id,
    onChange,
    error,
    helperText
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleToggleVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={value}
            name={name}          // ✅ properly passed
            id={id}              // ✅ properly passed
            onChange={onChange}
            error={error}
            helperText={helperText}
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleToggleVisibility}
                            edge="end"
                            aria-label="toggle password visibility"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default PasswordField;
