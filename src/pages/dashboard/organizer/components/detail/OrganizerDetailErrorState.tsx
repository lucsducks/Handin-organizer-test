import React from "react";

interface OrganizerDetailErrorStateProps {
  error: string;
}

export const OrganizerDetailErrorState: React.FC<
  OrganizerDetailErrorStateProps
> = ({ error }) => {
  return (
    <div className="rounded-lg bg-destructive/10 p-4">
      <p className="text-sm text-destructive">{error}</p>
    </div>
  );
};
