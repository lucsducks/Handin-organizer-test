import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface RecordingAdminDetailRejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rejectReason: string;
  rejectReasonError: string;
  processingAction: boolean;
  onRejectReasonChange: (value: string) => void;
  onConfirmReject: () => void;
}

export const RecordingAdminDetailRejectDialog: React.FC<
  RecordingAdminDetailRejectDialogProps
> = ({
  isOpen,
  onClose,
  rejectReason,
  rejectReasonError,
  processingAction,
  onRejectReasonChange,
  onConfirmReject,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Rechazar Grabación
          </DialogTitle>
          <DialogDescription>
            Proporciona una razón para rechazar esta grabación. Esta información
            se enviará al Organizador.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              label="Razón del rechazo"
              id="reason"
              placeholder="Explica por qué estás rechazando esta grabación..."
              value={rejectReason}
              onChange={(e) => onRejectReasonChange(e.target.value)}
              className={rejectReasonError ? "border-red-500" : ""}
              error={rejectReasonError}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            intent="secondary"
            onClick={onClose}
            disabled={processingAction}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onConfirmReject}
            disabled={processingAction}
          >
            {processingAction ? (
              <>
                <Spinner className="size-4" />
                Procesando...
              </>
            ) : (
              <>Rechazar Grabación</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
