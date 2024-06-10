"use client"
import { User } from "@prisma/client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { getImageData } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import Cropper from 'react-easy-crop'
import { PictureCropper } from "../ui/picture-cropper";

export const ProfilePictureForm = ({ user }: { user: User }) => {
    const form = useForm({});
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const submit = async (data: any) => {
        console.log({
            croppedImage
        })
    }

    const handlePreview = (url: string) => {
        setCroppedImage(url)
    }

    return (
        <Form {...form}>
            <form
                className="space-y-8 justify-center items-center flex flex-col w-full"
                onSubmit={form.handleSubmit(submit)}
            >
                <Dialog onOpenChange={setOpen} open={open}>
                    <DialogContent
                        className=""
                        onInteractOutside={(e) => {
                            e.preventDefault();
                        }}>
                        <DialogHeader>
                            <DialogTitle>
                                Crop your picture
                            </DialogTitle>
                            <DialogDescription>
                                Crop your picture to fit the best
                            </DialogDescription>
                        </DialogHeader>
                        <PictureCropper url={preview} handlePreview={handlePreview} />
                        <DialogFooter>
                            {inputRef?.current?.value && <Button
                                onClick={() => form.handleSubmit(submit)()}
                                type="submit"
                                className="px-10"
                                loading={form?.formState?.isSubmitting}>
                                Upload
                            </Button>}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Avatar className="w-60 h-60 cursor-pointer " onClick={() => {
                    inputRef.current?.click();
                }}>
                    <AvatarImage src={preview
                        // || user?.Image[0]?.File?.url
                    } className="" />
                    <AvatarFallback className="">
                        {user?.name}
                    </AvatarFallback>
                </Avatar>
                <FormField
                    control={form.control}
                    name="picture"
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                        <>
                            <FormItem hidden>
                                <FormControl>
                                    <Input
                                        multiple={false}
                                        ref={inputRef}
                                        hidden
                                        type="file"
                                        {...rest}
                                        onChange={(event) => {
                                            const { files, displayUrl } = getImageData(event)
                                            setPreview(displayUrl);
                                            onChange(files);
                                            setOpen(true);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </>
                    )}
                />
            </form>
        </Form>
    )
}