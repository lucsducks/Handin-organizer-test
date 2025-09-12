import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recording } from "@/models/recording/recording.model";
import { ResourceCard } from "@/pages/dashboard/recordings/components/ResourceCard";
import { Package } from "lucide-react";
import React from "react";

interface RecordingAdminDetailResourcesProps {
  recording: Recording;
}

export const RecordingAdminDetailResources: React.FC<
  RecordingAdminDetailResourcesProps
> = ({ recording }) => {
  const hasResources = recording.resources && recording.resources.length > 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-row items-center justify-between gap-2 text-grayscale-700">
          <div className="flex flex-row items-center gap-2">
            <Package className="h-5 w-5 text-primary-500-main" />
            <span className="font-semibold">Recursos</span>
          </div>
          {hasResources && (
            <span className="ml-2 rounded-full bg-primary-100 px-2 py-1 text-sm font-medium text-primary-500-main">
              {recording.resources.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasResources ? (
          <div className="grid gap-4">
            {recording.resources.map((resource: any, index: number) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-grayscale-100">
              <Package className="h-8 w-8 text-grayscale-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-grayscale-900">
              No hay recursos disponibles
            </h3>
            <p className="mx-auto max-w-sm text-grayscale-600">
              Esta grabación aún no tiene recursos asociados. Los recursos
              aparecerán aquí una vez que sean agregados.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
