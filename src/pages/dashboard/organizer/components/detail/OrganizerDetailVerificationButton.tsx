import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import React from "react";

interface OrganizerDetailVerificationButtonProps {
  organizer: any;
  onVerification: () => void;
}

export const OrganizerDetailVerificationButton: React.FC<
  OrganizerDetailVerificationButtonProps
> = ({ organizer, onVerification }) => {
  return (
    <Button
      intent={organizer.verified ? "primary" : "secondary"}
      size="sm"
      onClick={onVerification}
    >
      {organizer.verified ? (
        <>
          <Check className="size-4" />
          Verificado
        </>
      ) : (
        <>
          <X className="size-4" />
          No Verificado
        </>
      )}
    </Button>
  );
};
