import React, { useRef, useState, useCallback, useEffect } from 'react';
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
    onImageChange: (image: string) => void;
    initialImage?: string;
    size?: number;
    maxSizeMB?: number;
}

const cornerSize = 12;

const AvatarUploadWithCrop: React.FC<AvatarUploadProps> = ({
    onImageChange,
    initialImage,
    size = 80,
    maxSizeMB = 2,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | undefined>(initialImage);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropAreaPixels, setCropAreaPixels] = useState<any>(null);
    const [openCrop, setOpenCrop] = useState(false);

    // Natural image size (width/height)
    const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

    // Container size
    const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);

    // Handle file select
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

    // When imageSrc changes, get natural size
    useEffect(() => {
        if (!imageSrc) {
            setNaturalSize(null);
            return;
        }
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
        };
    }, [imageSrc]);

    // Get container size when dialog opens or window resizes
    useEffect(() => {
        const updateContainerSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        if (openCrop) {
            updateContainerSize();
            window.addEventListener('resize', updateContainerSize);
        }

        return () => window.removeEventListener('resize', updateContainerSize);
    }, [openCrop]);

    const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
        setCropAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        if (!imageSrc || !cropAreaPixels) return;

        try {
            const cropped = await getCroppedImg(imageSrc, cropAreaPixels);
            setCroppedImage(cropped);
            onImageChange(cropped);
        } catch (error) {
            console.error('Cropping failed:', error);
        }
        setOpenCrop(false);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // Calculate scaled crop box styles
    const getCropBoxStyle = () => {
        if (!cropAreaPixels || !naturalSize || !containerSize) return {};

        const scaleX = containerSize.width / naturalSize.width;
        const scaleY = containerSize.height / naturalSize.height;

        return {
            position: 'absolute' as const,
            border: '2px solid #4caf50',
            boxSizing: 'border-box' as const,
            pointerEvents: 'none' as const,
            left: cropAreaPixels.x * scaleX,
            top: cropAreaPixels.y * scaleY,
            width: cropAreaPixels.width * scaleX,
            height: cropAreaPixels.height * scaleY,
        };
    };

    // Positions for corners
    const getCornerPosition = (corner: string): React.CSSProperties => {
        switch (corner) {
            case 'topLeft':
                return { top: 0, left: 0, transform: `translate(-50%, -50%)` };
            case 'topRight':
                return { top: 0, right: 0, transform: `translate(50%, -50%)` };
            case 'bottomLeft':
                return { bottom: 0, left: 0, transform: `translate(-50%, 50%)` };
            case 'bottomRight':
                return { bottom: 0, right: 0, transform: `translate(50%, 50%)` };
            default:
                return {};
        }
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

            <Dialog open={openCrop} fullWidth maxWidth="sm" onClose={() => setOpenCrop(false)}>
                <DialogTitle>Crop Image</DialogTitle>
                <DialogContent>
                    <Box
                        ref={containerRef}
                        sx={{ position: 'relative', width: '100%', height: 300, bgcolor: '#333' }}
                    >
                        {imageSrc && (
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        )}

                        {/* Crop box overlay with corner dots */}
                        {cropAreaPixels && naturalSize && containerSize && (
                            <div style={getCropBoxStyle()}>
                                {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((corner) => (
                                    <div
                                        key={corner}
                                        style={{
                                            position: 'absolute',
                                            width: cornerSize,
                                            height: cornerSize,
                                            backgroundColor: 'red',
                                            borderRadius: '50%',
                                            border: '2px solid white',
                                            boxSizing: 'border-box',
                                            ...getCornerPosition(corner),
                                        }}
                                    />
                                ))}
                            </div>
                        )}
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
