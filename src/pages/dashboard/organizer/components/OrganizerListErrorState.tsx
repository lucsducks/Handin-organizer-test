import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface OrganizerListErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const OrganizerListErrorState: React.FC<OrganizerListErrorStateProps> = ({
  error,
  onRetry,
}) => {
  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="text-red-800">Error al cargar los Organizadores</AlertTitle>
      <AlertDescription className="mt-2 text-red-700">
        <div className="space-y-3">
          <p>{error}</p>
          {onRetry && (
            <Button
              size="sm"
              onClick={onRetry}
              className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Intentar de nuevo
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};