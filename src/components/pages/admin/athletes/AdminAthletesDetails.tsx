import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { useToast } from '@/components/ui/use-toast';
import useFetch from '@/hooks/useFetch';
import "./AdminAthletesDetails.scss"
import PageTemplate from '@/components/sections/PageTeample/PageTemplate';
import 'react-image-crop/dist/ReactCrop.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';


export default function AdminAthletesDetails() {
    const { id } = useParams();
    const { toast } = useToast();
    const [imageSrc, setImageSrc] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const [athlete, setAthlete] = useState(null);
    const { isLoading, fetchData: fetchAthlete } = useFetch(
        `/admin/api/athletes/${id}`
    );

    useEffect(() => {
        const getAthlete = async () => {
            try {
                const { data } = await fetchAthlete();
                if (data) {
                    setAthlete(data);
                    // Fetch the image
                    const response = await fetch(data.pictureProfile);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const blob = await response.blob();
                    if (blob.size === 0) {
                        throw new Error('Image data is empty');
                    }
                    // Convert the blob to a base64 string
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        setImageSrc(reader.result); // Set imageSrc to the base64 string
                    }
                    reader.readAsDataURL(blob);
                }
            } catch (err) {
                toast({
                    variant: "destructive",
                    title: "Fetch countries failed",
                    description: `Error: ${err}`,
                });
            }
        };
        getAthlete();
    }, [fetchAthlete, toast]);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = new Image();
        image.src = imageSrc;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = 'newFile.jpeg';
                window.URL.revokeObjectURL(imageSrc);
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const makeClientCrop = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImageUrl = await getCroppedImg(
                imageSrc,
                croppedAreaPixels
            );
            setCroppedImage(URL.createObjectURL(croppedImageUrl));
        }
    };

    useEffect(() => {
        makeClientCrop();
    }, [croppedAreaPixels]);

    const onSubmit = useCallback(async () => {
        try {
            if (!croppedImage) {
                throw new Error('No cropped image to submit');
            }

            // Create a FormData instance
            const formData = new FormData();

            // Fetch the blob data of the cropped image
            const response = await fetch(croppedImage);
            const blob = await response.blob();

            // Append the blob data to the FormData instance
            formData.append('pictureProfile', blob, 'newFile.jpeg');

            // Send the PATCH request with the FormData instance
            const { data } = await fetchAthlete({
                method: "PATCH",
                body: formData, // Send the FormData instance
            });

            if (!data) return;

            setAthlete(data);

            toast({
                title: "Athlete updated successfully",
                description: `Athlete ${athlete.firstname} ${athlete.lastname} has been updated.`,
            })
        } catch (err) {
            console.error("err", err);
            toast({
                variant: "destructive",
                title: "Athlete update failed",
                description: `Error: ${err instanceof Error ? err.message : err}`,
            });
        }
    }, [fetchAthlete, toast, croppedImage])

    const onFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                setIsCropping(true);
                setCroppedImage(null); // Reset the cropped image
            });
            reader.readAsDataURL(event.target.files[0]);
        } else {
            setIsCropping(true); // Allow cropping of the existing image
        }
    };

    const handleZoom = (newZoom) => {
        setZoom(newZoom);
    };

    const handleCrop = async () => {
        await makeClientCrop();
        setIsCropping(false);
        onSubmit();
    };

    const openImageEditor = () => {
        setIsCropping(true); // Open the cropping dialog
    };

    return (
        <>
            <PageTemplate>
                {athlete === null && !isLoading && <p>Athlete not found</p>}
                {athlete !== null && (
                    <div className="fileUpload">
                        <AlertDialog open={isCropping} onOpenChange={setIsCropping}>
                            <AlertDialogTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={athlete.pictureProfile} alt="Profile athlete" />
                                    <AvatarFallback>{`${athlete.firstname[0]}${athlete.lastname[0]}`}</AvatarFallback>                                </Avatar>
                                {/* <Button>Edit Image</Button> */}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Crop Image</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Adjust the image as needed, then click "Confirm Crop" to proceed.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
                                {imageSrc && (
                                    <Cropper
                                        image={imageSrc}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={4 / 4}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                    />
                                )}
                                <Slider
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onValueChange={handleZoom} // Correctly use onValueChange only
                                />
                                <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="picture">Select an other picture</Label>
                                    <Input id="picture" type="file" onChange={onFileChange} />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <Button onClick={handleCrop}>Confirm Crop</Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </PageTemplate>
        </>
    );
};