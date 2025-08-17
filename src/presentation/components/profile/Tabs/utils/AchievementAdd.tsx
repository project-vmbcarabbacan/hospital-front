import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, TextField, Autocomplete } from '@mui/material';
import { useAppDispatch } from '../../../../../app/store/hooks';
import { achievementAdd } from '../../../../../app/store/slices/profileSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogProps {
    open: boolean;
    handleClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose }) => {

    const dispatch = useAppDispatch()

    const [form, setForm] = useState({
        title: '',
        description: '',
        year_awarded: '',
    })

    const [errors, setErrors] = useState<{ title?: string; description?: string, year_awarded?: string }>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return

        dispatch(achievementAdd(form))
        clearForm()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const clearForm = () => {
        setForm({
            title: '',
            description: '',
            year_awarded: '',
        })
        setErrors({})
        handleClose()
    }

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!form.title.trim())
            newErrors.title = 'Title is required'

        if (!form.description.trim())
            newErrors.description = 'Description is required'

        if (!form.year_awarded.trim())
            newErrors.year_awarded = 'Year awarded is required'


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 21 }, (_, i) => (currentYear - i).toString());

    return (
        <>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                fullWidth={true}
                maxWidth="sm"
                onClose={clearForm}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>{"Add Achievement"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            value={form.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                        />

                        <Autocomplete
                            options={years}
                            value={form.year_awarded || ''}
                            onChange={(event, newValue) => {
                                setForm({ ...form, year_awarded: newValue || '' });
                                setErrors({ ...errors, year_awarded: undefined });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Year Awarded"
                                    margin="normal"
                                    fullWidth
                                    helperText={errors.year_awarded}
                                    error={!!errors.year_awarded}
                                />
                            )}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={form.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default AlertDialog;
