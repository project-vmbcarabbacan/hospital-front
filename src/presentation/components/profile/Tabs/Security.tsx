import React, { useState } from "react";
import TabPanel from "./TabPanel";
import { Value } from "../../utils/types";
import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
    Grid,
} from "@mui/material";

const titles = ["Mr", "Mrs", "Ms", "Dr", "Prof", "Other"];

const SecurityTab: React.FC<Value> = ({ value }) => {
    // Personal info state
    const [title, setTitle] = useState<string>("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 2FA toggle
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // Alerts state
    const [personalInfoError, setPersonalInfoError] = useState<string | null>(null);
    const [personalInfoSuccess, setPersonalInfoSuccess] = useState<string | null>(null);

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

    // -------- Validation & Handlers --------

    const validateEmail = (email: string) =>
        /^\S+@\S+\.\S+$/.test(email);

    const validatePhone = (phone: string) =>
        /^[\d\s()+-]{7,20}$/.test(phone); // simple phone regex

    const handlePersonalInfoSave = () => {
        setPersonalInfoError(null);
        setPersonalInfoSuccess(null);

        if (!title) {
            setPersonalInfoError("Please select a title.");
            return;
        }
        if (!firstName.trim()) {
            setPersonalInfoError("First name is required.");
            return;
        }
        if (!lastName.trim()) {
            setPersonalInfoError("Last name is required.");
            return;
        }
        if (!email.trim() || !validateEmail(email)) {
            setPersonalInfoError("Please enter a valid email address.");
            return;
        }
        if (phone.trim() && !validatePhone(phone)) {
            setPersonalInfoError("Please enter a valid phone number.");
            return;
        }

        // TODO: Call backend API to update personal info here

        setPersonalInfoSuccess("Personal information updated successfully.");
    };

    const handlePasswordChange = () => {
        setPasswordError(null);
        setPasswordSuccess(null);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }
        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters.");
            return;
        }

        // TODO: Call backend API to change password here

        setPasswordSuccess("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleToggle2FA = () => {
        // TODO: Call backend API to toggle 2FA
        setTwoFactorEnabled(!twoFactorEnabled);
    };

    return (
        <TabPanel value={7} index={value}>
            <Box
                width="100%"
                maxWidth="700px"
                p={3}
                borderRadius={2}
                sx={{ display: "block" }}
            >


                {/* Personal Info Section */}
                <Typography variant="h6" mb={2}>
                    Personal Information
                </Typography>

                {personalInfoError && (
                    <Alert severity="error" onClose={() => setPersonalInfoError(null)} sx={{ mb: 2 }}>
                        {personalInfoError}
                    </Alert>
                )}
                {personalInfoSuccess && (
                    <Alert severity="success" onClose={() => setPersonalInfoSuccess(null)} sx={{ mb: 2 }}>
                        {personalInfoSuccess}
                    </Alert>
                )}

                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Select
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            displayEmpty
                            inputProps={{ "aria-label": "Title" }}
                        >
                            <MenuItem value="" disabled>
                                Select Title
                            </MenuItem>
                            {titles.map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="First Name"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 5 }}>
                        <TextField
                            label="Last Name"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Phone"
                            type="tel"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePersonalInfoSave}
                    sx={{ mt: 3 }}
                >
                    Save Personal Info
                </Button>

                {/* Password Change Section */}
                <Box mt={5}>
                    <Typography variant="h6" mb={1}>
                        Change Password
                    </Typography>

                    {passwordError && (
                        <Alert severity="error" onClose={() => setPasswordError(null)} sx={{ mb: 2 }}>
                            {passwordError}
                        </Alert>
                    )}
                    {passwordSuccess && (
                        <Alert severity="success" onClose={() => setPasswordSuccess(null)} sx={{ mb: 2 }}>
                            {passwordSuccess}
                        </Alert>
                    )}

                    <TextField
                        label="Current Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        helperText="Minimum 8 characters"
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePasswordChange}
                        sx={{ mt: 2 }}
                    >
                        Update Password
                    </Button>
                </Box>

                {/* Two-Factor Authentication */}
                <Box mt={5}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={twoFactorEnabled}
                                onChange={handleToggle2FA}
                                color="primary"
                            />
                        }
                        label="Enable Two-Factor Authentication (2FA)"
                    />
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        Two-factor authentication adds an extra layer of security to your account.
                    </Typography>
                </Box>

                {/* Last Login Info */}
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary">
                        Last login: 2025-08-10 09:23 AM from IP 192.168.1.100
                    </Typography>
                </Box>
            </Box>
        </TabPanel>
    );
};

export default SecurityTab;
