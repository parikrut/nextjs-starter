"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { useConfirm } from "@/context/alertDialogProvider";
import { UpdateUser } from "@/server/user.api";
import { useRouter } from "next/navigation";

export const VerifyUser = ({ id }: { id: number }) => {
    const confirm = useConfirm();
    const { toast } = useToast()
    const router = useRouter();

    const verifyUser = async () => {
        const result = await confirm({
            title: "Verify user?",
            body: "This will verify the user and allow them to access the platform. Are you sure you want to proceed?",
            cancelButton: "Cancel",
            actionButton: "Yes, Verify",
        })

        if (!result) return;

        const response = await UpdateUser(id, { emailVerified: true });
        if (response.success) {
            toast({
                title: "User verified",
                variant: "success"
            });
            router.refresh();
        }
        else {
            toast({
                title: response.message,
                variant: "destructive"
            })
        }


    }
    return (
        <Button variant="default" onClick={verifyUser}>
            Verify User
        </Button>
    )
}