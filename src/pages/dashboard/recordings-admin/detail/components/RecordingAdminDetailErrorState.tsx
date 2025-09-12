import React from "react";

interface RecordingAdminDetailErrorStateProps {
  error: string;
}

export const RecordingAdminDetailErrorState: React.FC<
  RecordingAdminDetailErrorStateProps
> = ({ error }) => {
  return (
    <div className="rounded-lg bg-destructive/10 p-4">
      <p className="text-sm text-destructive">{error}</p>
    </div>
  );
};
