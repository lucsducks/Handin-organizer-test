import { ResourceTypes } from "@/enums/resource-types.enum";
import React from "react";
import { RecordingAdminContentVideoInfo } from "./RecordingAdminContentVideoInfo";
import { RecordingAdminContentVideoPlayer } from "./RecordingAdminContentVideoPlayer";

interface RecordingAdminContentMainSectionProps {
  videoResource: {
    id: number;
    title: string;
    type: ResourceTypes;
    description: string;
    publicUrl: string;
  } | null;
}

export const RecordingAdminContentMainSection: React.FC<
  RecordingAdminContentMainSectionProps
> = ({ videoResource }) => {
  return (
    <section className="col-span-2 flex flex-col gap-4">
      <RecordingAdminContentVideoPlayer videoResource={videoResource} />
      <RecordingAdminContentVideoInfo videoResource={videoResource} />
    </section>
  );
};
