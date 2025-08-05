import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginWithSession } from '../../app/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { UserLoginDTO } from '../../app/DTO/UserLoginDTO';
import axios from 'axios';
import { ApiError } from '../../domain/entities/ApiError';
import { Email } from '../../domain/valueObjects/Email';
import PasswordField from '../components/shared/PasswordField';

const LoginPage: React.FC = () => {

    const [remember, setRemember] = useState<boolean>(false);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!form.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        try {
            Email.create(form.email);
        } catch (err) {
            newErrors.email = (err as Error).message;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
        setServerError(null);
    };

    const { is_loading, is_auth } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (is_auth) {
            navigate('/');
        }
    }, [is_auth, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;

        const dto: UserLoginDTO = {
            email: form.email,
            password: form.password
        }

        try {
            const result = await dispatch(loginWithSession(dto))
            if (loginWithSession.fulfilled.match(result)) {
                navigate('/')
            }
            else {
                setServerError('Invalid credentials')
            }

        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err))
                setServerError(`Error: ${err.message}`)
        }
        // Example: call login API here
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f3f4f6',
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={form.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <PasswordField
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />


                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            {serverError && <Alert severity="error">{serverError}</Alert>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                disabled={is_loading}
                            >
                                Sign In
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
