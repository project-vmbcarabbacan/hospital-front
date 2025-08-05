export default async function getCircularCroppedImg(
    imageSrc: string,
    pixelCrop: any,
    rotation = 0
): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const safeArea = Math.max(image.width, image.height) * 2;

    canvas.width = safeArea;
    canvas.height = safeArea;

    if (!ctx) throw new Error('Failed to get canvas context');

    // Move to center
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(image, (safeArea - image.width) / 2, (safeArea - image.height) / 2);

    const data = ctx.getImageData(
        (safeArea - image.width) / 2 + pixelCrop.x,
        (safeArea - image.height) / 2 + pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    );

    // Set canvas to crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    // Apply circular clipping
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(
        pixelCrop.width / 2,
        pixelCrop.height / 2,
        pixelCrop.width / 2,
        0,
        2 * Math.PI
    );
    ctx.closePath();
    ctx.fill();

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve({ blob, base64: URL.createObjectURL(blob) });
            else reject('Failed to create blob');
        }, 'image/png');
    });
}

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // for CORS images
        image.src = url;
    });
}
