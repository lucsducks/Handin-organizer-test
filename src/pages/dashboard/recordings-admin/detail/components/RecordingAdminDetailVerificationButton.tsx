import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import React from "react";

interface RecordingAdminDetailVerificationButtonProps {
  verificationStatus: string;
  processingAction: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export const RecordingAdminDetailVerificationButton: React.FC<
  RecordingAdminDetailVerificationButtonProps
> = ({ verificationStatus, processingAction, onApprove, onReject }) => {
  const isVerified = verificationStatus === "Verificado";
  const isRejected = verificationStatus === "Rechazado";
  const isPending = verificationStatus === "Pendiente";

  let buttonClasses = "";
  let buttonContent = (
    <>
      <BadgeCheck className="size-4" />
      Verificación
    </>
  );

  if (isVerified) {
    buttonContent = (
      <>
        <Check className="size-4" />
        Verificado
      </>
    );
  } else if (isRejected) {
    buttonClasses = "bg-red-500 text-white hover:bg-red-600";
    buttonContent = (
      <>
        <X className="size-4" />
        Rechazado
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className={`w-full sm:w-auto ${buttonClasses}`}>
          {processingAction ? (
            <>
              <Spinner className="mr-1 size-4" />
              Procesando...
            </>
          ) : (
            <>
              {buttonContent}
              <ChevronDown className="size-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isVerified && (
          <DropdownMenuItem
            className="cursor-pointer text-primary-500-main"
            onClick={onApprove}
            disabled={processingAction}
          >
            <ThumbsUp className="size-4" />
            <span>Aprobar grabación</span>
          </DropdownMenuItem>
        )}

        {(isVerified || isPending) && (
          <>
            {isPending && !isRejected && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className="cursor-pointer text-error hover:bg-red-600/10 hover:text-error"
              onClick={onReject}
              disabled={processingAction}
            >
              <ThumbsDown className="size-4" />
              Rechazar grabación
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
