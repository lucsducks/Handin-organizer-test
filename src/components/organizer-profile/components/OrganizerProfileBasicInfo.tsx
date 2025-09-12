import { Badge } from "@/components/ui/badge";
import { Organizer } from "@/models/organizer/organizer.model";
import React from "react";

interface OrganizerProfileBasicInfoProps {
  organizer: Organizer;
  organizerName: string;
}

export const OrganizerProfileBasicInfo: React.FC<
  OrganizerProfileBasicInfoProps
> = ({ organizer, organizerName }) => {
  //TODO: Change RUC
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          {organizerName}
        </h2>
        <Badge variant={organizer.verified ? "default" : "warning"}>
          {organizer.verified ? "Verificado" : "Pendiente"}
        </Badge>
      </div>
      <div className="flex flex-row items-center gap-2 text-sm text-grayscale-600 md:text-base">
        <p>{organizer.degree}</p>
        <div className="h-4 w-px bg-grayscale-400" />
        <p className="">{organizer.specialty}</p>
      </div>
    </div>
  );
};
