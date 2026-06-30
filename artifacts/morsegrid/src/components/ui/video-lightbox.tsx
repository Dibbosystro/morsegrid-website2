import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface VideoLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  title: string;
  description?: string;
}

export function VideoLightbox({
  open,
  onOpenChange,
  videoUrl,
  title,
  description,
}: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 bg-black sm:rounded-xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {description && (
          <DialogDescription className="sr-only">{description}</DialogDescription>
        )}
        <div className="relative aspect-video w-full bg-black">
          {open && (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
