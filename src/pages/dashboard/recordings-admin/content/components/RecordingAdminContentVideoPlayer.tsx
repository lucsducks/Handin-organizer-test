import { ResourceTypes } from "@/enums/resource-types.enum";
import React from "react";
import ReactPlayer from "react-player";

interface RecordingAdminContentVideoPlayerProps {
  videoResource: {
    id: number;
    title: string;
    type: ResourceTypes;
    description: string;
    publicUrl: string;
  } | null;
}

export const RecordingAdminContentVideoPlayer: React.FC<
  RecordingAdminContentVideoPlayerProps
> = ({ videoResource }) => {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      {videoResource ? (
        <ReactPlayer
          className="player"
          url={videoResource.publicUrl}
          width="100%"
          height="100%"
          controls
          playing
          playsinline
          pip
          volume={0.5}
          config={{
            file: {
              attributes: {
                poster: "/api/placeholder/1280/720",
              },
            },
          }}
        />
      ) : (
        <div className="flex size-full items-center justify-center overflow-hidden bg-grayscale-100 text-grayscale-500">
          <span>No hay un video seleccionado</span>
        </div>
      )}
    </div>
  );
};
