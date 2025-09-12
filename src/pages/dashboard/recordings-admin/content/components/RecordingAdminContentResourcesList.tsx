import { getResourceIcon } from "@/components/ResourceIcon";
import { Resource } from "@/models/recording/recording.model";
import { Download, Package, Play } from "lucide-react";
import React from "react";

interface RecordingAdminResourcesListProps {
  resources: Resource[];
  handleResourceClick: (resource: Resource) => void;
  handleDownload: (resource: Resource) => void;
  isPlayableVideo: (resource: Resource) => boolean;
  isDownloadable: (resource: Resource) => boolean;
}

export const RecordingAdminResourcesList: React.FC<
  RecordingAdminResourcesListProps
> = ({
  resources,
  handleResourceClick,
  handleDownload,
  isPlayableVideo,
  isDownloadable,
}) => {
  return (
    <div className="flex h-fit flex-col gap-3 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 border-b border-primary-100 pb-2">
        <Package className="h-5 w-5 text-primary-600" />
        <h1 className="text-lg font-semibold text-grayscale-800">Recursos</h1>
        <span className="ml-auto rounded-full bg-primary-100 px-2 py-1 text-sm font-medium text-primary-500-main">
          {resources.length}
        </span>
      </div>

      {resources.length > 0 ? (
        <div className="flex flex-col gap-4">
          {resources.map((resource, index) => {
            const isVideo = isPlayableVideo(resource);
            const isDownload = isDownloadable(resource);

            return (
              <div
                key={resource.id}
                className="flex w-full items-center gap-3 rounded-lg border border-grayscale-300 p-4"
              >
                <div className="flex-shrink-0">
                  {getResourceIcon(resource.type)}
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <span className="truncate font-medium text-grayscale-700">
                    {resource.title || `Recurso ${index + 1}`}
                  </span>
                  {resource.description && (
                    <p className="line-clamp-1 text-sm text-grayscale-600">
                      {resource.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-shrink-0 items-center gap-2">
                  {isVideo && (
                    <button
                      onClick={() => handleResourceClick(resource)}
                      className="flex size-10 items-center justify-center rounded-lg p-2 text-primary-500-main duration-200 hover:bg-primary-100"
                    >
                      <Play size={18} className="text-primary-500-main" />
                    </button>
                  )}
                  {isDownload && (
                    <button
                      onClick={() => handleDownload(resource)}
                      className="flex size-10 items-center justify-center rounded-lg p-2 text-primary-500-main duration-200 hover:bg-primary-100"
                      title="Descargar archivo"
                    >
                      <Download size={18} className="text-primary-500-main" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-grayscale-100">
            <Package className="h-6 w-6 text-grayscale-400" />
          </div>
          <p className="text-sm leading-relaxed text-grayscale-600">
            La grabación aún no tiene recursos disponibles.
            <br />
            Por favor, vuelva más tarde para revisar las actualizaciones.
          </p>
        </div>
      )}

      {(resources.some((r) => isPlayableVideo(r)) ||
        resources.some((r) => isDownloadable(r))) && (
        <div className="mt-2 space-y-1 border-t border-primary-100 pt-2">
          {resources.some((r) => isPlayableVideo(r)) && (
            <p className="flex items-center gap-1 text-xs text-grayscale-500">
              <Play className="h-3 w-3" />
              Haz clic en los videos disponibles para reproducirlos
            </p>
          )}
          {resources.some((r) => isDownloadable(r)) && (
            <p className="flex items-center gap-1 text-xs text-grayscale-500">
              <Download className="h-3 w-3" />
              Usa el botón de descarga para obtener archivos, documentos,
              imágenes y comprimidos
            </p>
          )}
        </div>
      )}
    </div>
  );
};
