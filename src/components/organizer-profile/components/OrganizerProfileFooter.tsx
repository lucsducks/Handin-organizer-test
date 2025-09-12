import React from "react";

interface OrganizerProfileFooterProps {
  createdAt: string;
  updatedAt: string;
  formatDate: (date: string) => string;
}

export const OrganizerProfileFooter: React.FC<OrganizerProfileFooterProps> = ({
  createdAt,
  updatedAt,
  formatDate,
}) => {
  return (
    <div className="flex flex-col items-center justify-between border-t pt-4 text-sm text-grayscale-600 sm:flex-row">
      <div>Creado: {formatDate(createdAt)}</div>
      <div>Última actualización: {formatDate(updatedAt)}</div>
    </div>
  );
};
