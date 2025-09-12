import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";

interface OrganizerDetailDownloadButtonProps {
  onDownloadCV: () => void;
}

export const OrganizerDetailDownloadButton: React.FC<
  OrganizerDetailDownloadButtonProps
> = ({ onDownloadCV }) => {
  return (
    <Button size="sm" onClick={onDownloadCV}>
      <Download className="size-4" />
      Descargar Brochure
    </Button>
  );
};
