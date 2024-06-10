import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { Slider } from './slider'
import getCroppedImg from './picture-cropper/helper'
import { toast } from './use-toast'

export const PictureCropper = ({
    url,
    handlePreview
}: {
    url: string | undefined
    handlePreview: (url: string) => void
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
        try {
            const croppedImage = await getCroppedImg(
                url as string,
                croppedAreaPixels,
                0
            )
            handlePreview(croppedImage as string)
        } catch (e) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }
    return (
        <div className='flex flex-col gap-4 py-4'>
            <div className="relative w-full h-96">
                <Cropper
                    image={url}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div>
                <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(value) => setZoom(value[0])}
                />
            </div>
        </div>
    )
}