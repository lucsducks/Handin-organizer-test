import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React from "react";

interface RecordingsOrganizerGridErrorStateProps {
  error: string;
}

export const RecordingsOrganizerGridErrorState: React.FC<
  RecordingsOrganizerGridErrorStateProps
> = ({ error }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>Error: {error}</AlertDescription>
    </Alert>
  );
};
