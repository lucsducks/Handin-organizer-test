import { ResourceTypes } from "@/enums/resource-types.enum";
import React from "react";

interface RecordingAdminContentVideoInfoProps {
  videoResource: {
    id: number;
    title: string;
    type: ResourceTypes;
    description: string;
    publicUrl: string;
  } | null;
}

export const RecordingAdminContentVideoInfo: React.FC<
  RecordingAdminContentVideoInfoProps
> = ({ videoResource }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-primary-100 p-4 shadow">
      <h1 className="text-lg font-semibold text-grayscale-800 sm:text-2xl">
        {videoResource ? videoResource.title : "No hay un recurso seleccionado"}
      </h1>
      <p className="text-grayscale-600">
        {videoResource ? videoResource.description : "No hay descripción"}
      </p>
    </div>
  );
};
