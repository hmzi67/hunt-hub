"use client"

interface FileuploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileuploadProps) => {
    return (
        <div>
            File upload Component
        </div>
    )
}