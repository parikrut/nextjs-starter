"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { useConfirm } from "@/context/alertDialogProvider";
import { UpdateUser } from "@/server/user.api";
import { useRouter } from "next/navigation";

export const UnverifyUser = ({ id }: { id: number }) => {
    const confirm = useConfirm();
    const { toast } = useToast()
    const router = useRouter();

    const unverifyUser = async () => {
        const result = await confirm({
            title: "Unverify user?",
            body: "This will unverift the user and restrict their access to the platform. Are you sure you want to proceed?",
            cancelButton: "Cancel",
            actionButton: "Yes, Unverify",
        })

        if (!result) return;

        const response = await UpdateUser(id, { emailVerified: false });
        if (response.success) {
            toast({
                title: "User unverified",
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
        <Button variant="destructive" onClick={unverifyUser}>
            Unverify User
        </Button>
    )
}