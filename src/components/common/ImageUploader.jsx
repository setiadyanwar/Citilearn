import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { MAX_THUMBNAIL_SIZE_BYTES, MAX_THUMBNAIL_SIZE_MB } from '@/constants/fileUpload';

/**
 * Reusable Image Uploader Component
 * 
 * @param {string} value - The current image URL or base64 string
 * @param {function} onChange - Callback function when an image is selected/changed
 * @param {string} label - Optional label for the uploader
 * @param {string} className - Additional CSS classes for the container
 * @param {string} aspectRatio - CSS class for height or aspect ratio (default: h-48 md:h-56)
 * @param {string} helperText - Optional helper text below the main label
 */
const ImageUploader = ({
    value,
    onChange,
    label,
    className,
    aspectRatio = "h-48 md:h-56",
    helperText = `PNG, JPG up to ${MAX_THUMBNAIL_SIZE_MB}MB`
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_THUMBNAIL_SIZE_BYTES) {
                toast.error(`File is too large. Max size is ${MAX_THUMBNAIL_SIZE_MB}MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {label && (
                <div className="space-y-0.5">
                    <label className="text-sm font-bold text-main tracking-tight">{label}</label>
                    <p className="text-xs text-secondary font-medium">{helperText}</p>
                </div>
            )}

            <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "border-2 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden bg-primary/5",
                    aspectRatio
                )}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {value ? (
                    <>
                        <img src={value} alt="Uploaded content" className="w-full h-full object-cover opacity-100 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="font-bold rounded-lg"
                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            >
                                Change
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="font-bold rounded-lg"
                                onClick={handleRemove}
                            >
                                Remove
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-4 bg-white rounded-full border border-primary/10 mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="text-primary" size={24} />
                        </div>
                        <p className="text-sm font-bold text-primary">Click to upload image</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
