import React, { useRef, useState, useCallback } from 'react';
import {
    Avatar,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
    Slider,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

interface AvatarUploadProps {
    onImageChange: (image: Blob) => void;
    initialImage?: string;
    size?: number;
    maxSizeMB?: number;
}

const AvatarUploadWithCrop: React.FC<AvatarUploadProps> = ({
    onImageChange,
    initialImage,
    size = 80,
    maxSizeMB = 2,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | undefined>(initialImage);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropAreaPixels, setCropAreaPixels] = useState<any>(null);
    const [openCrop, setOpenCrop] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image.');
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`Image size should not exceed ${maxSizeMB}MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setOpenCrop(true);
        };
        reader.readAsDataURL(file);
    };

    const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
        setCropAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        try {
            const { blob, url } = await getCroppedImg(imageSrc!, cropAreaPixels);
            setCroppedImage(url);
            onImageChange(blob);
        } catch (error) {
            console.error('Cropping failed:', error);
        }
        setOpenCrop(false);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Box sx={{ position: 'relative', width: size, height: size }}>
                <Avatar
                    src={croppedImage}
                    sx={{ width: size, height: size, cursor: 'pointer' }}
                    onClick={handleClick}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        boxShadow: 1,
                    }}
                >
                    <PhotoCamera fontSize="small" />
                </IconButton>
            </Box>

            <Dialog open={openCrop} fullWidth maxWidth="sm">
                <DialogTitle>Crop Image</DialogTitle>
                <DialogContent>
                    <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
                        <Cropper
                            image={imageSrc!}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </Box>
                    <Slider
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(_, value) => setZoom(value as number)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCrop(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCropSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AvatarUploadWithCrop;