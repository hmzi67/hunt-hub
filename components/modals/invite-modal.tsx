"use client"

import axios from "axios";

import { 
    Check,
    Copy, 
    RefreshCw 
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle

} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


export const InviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();    

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type == "invite";
    const { server } = data;
    
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen("invite", { server: response.data });

        } catch (error) {
            console.log(error);
            
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Invite friends to join and share your server to expand your community and build connections.
                    </DialogDescription>
                </DialogHeader>
               <div className="p-6">
                    <Label className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
                        Share invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2 ">
                        <Input 
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={onCopy}
                            size="icon" 
                        >
                            {copied 
                                ? <Check className="w-4 h-4"/> 
                                : <Copy className="w-4 h-4" />
                            }
                            
                        </Button>
                    </div>
                    <Button
                      onClick={onNew}
                      disabled={isLoading}
                      variant="link"
                      size="sm"
                      className="text-sm text-zinc-500 mt-4"
                    >
                        Generate new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
               </div>
            </DialogContent>
        </Dialog>
    )
}