import React from "react";

interface RecordingAdminContentHeaderProps {
  recording: {
    title: string;
    description: string;
    banner: {
      publicUrl: string;
    };
  };
}

export const RecordingAdminContentHeader: React.FC<
  RecordingAdminContentHeaderProps
> = ({ recording }) => {
  return (
    <div className="flex flex-row gap-4 rounded-lg border border-primary-100 p-4 shadow">
      <div className="relative hidden aspect-video h-24 sm:block">
        <img
          alt="recording-banner"
          className="h-full w-full overflow-hidden rounded-lg object-cover"
          src={recording.banner.publicUrl}
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-grayscale-800 md:line-clamp-2">
          {recording.title}
        </h1>
        <p className="text-sm text-grayscale-600 md:line-clamp-2">
          {recording.description}
        </p>
      </div>
    </div>
  );
};
