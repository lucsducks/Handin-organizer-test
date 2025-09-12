import { Button } from "@/components/ui/button";
import { FileText, Upload, X as XIcon } from "lucide-react";
import React from "react";

interface UserProfileOrganizerFormFileUploadProps {
  selectedFile: File | null;
  fileError: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: () => void;
}

export const UserProfileOrganizerFormFileUpload: React.FC<
  UserProfileOrganizerFormFileUploadProps
> = ({ selectedFile, fileError, handleFileChange, handleFileRemove }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-grayscale-500">
        <span className="text-sm font-normal md:text-base">
          Brochure / Portafolio institucional
        </span>
      </label>
      {!selectedFile ? (
        <label className="hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-grayscale-400 p-6 transition-colors hover:bg-grayscale-100">
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="size-8 text-grayscale-600" />
            <span className="text-sm text-grayscale-600">
              Haz click para subir un archivo
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/pdf"
              onChange={handleFileChange}
            />
            <p className="text-xs text-grayscale-500">PDF hasta 10MB</p>
          </div>
        </label>
      ) : (
        <div className="relative flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-grayscale-400 p-6 transition-colors">
          <div className="flex flex-col items-center justify-center gap-2">
            <FileText className="size-8 text-grayscale-600" />
            <span className="text-sm text-grayscale-600">
              {selectedFile.name}
            </span>
          </div>
          <Button
            type="button"
            size="icon"
            intent="icon"
            className="absolute right-1 top-1 bg-white"
            onClick={handleFileRemove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      {fileError && <p className="mt-2 text-sm text-red-500">{fileError}</p>}
    </div>
  );
};
