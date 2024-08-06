import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface UserAvatarProps {
    src?: string;
    className?: string;
};

export const UserAvatar = ({
    src,
    className,
}: UserAvatarProps) => {
    return (
        <Avatar className={cn(
            "h-7 w-7 md:h-10 md:w-10 rounded-full",
            className
        )}>
            <AvatarImage src={src} className="h-7 w-7 md:h-10 md:w-10 rounded-full object-cover" />
        </Avatar>
    )
}