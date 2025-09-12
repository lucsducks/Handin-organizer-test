import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Star, Users } from "lucide-react";
import React from "react";

interface RecordingAdminDetailMetricsProps {
  recording: any;
  students: number;
}

export const RecordingAdminDetailMetrics: React.FC<
  RecordingAdminDetailMetricsProps
> = ({ recording, students }) => {
  return (
    <div className="flex grid-cols-3 flex-col gap-4 xl:grid">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <Star className="h-5 w-5 min-w-5" />
            Valoración
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            <span className="pr-2 text-grayscale-600">{recording.rating}</span>
            {Array.from({ length: 5 }, (_, index) =>
              index < Number(recording.rating) ? (
                <Star
                  key={index}
                  className="size-5 min-w-5 fill-primary-500-main"
                  strokeWidth={0}
                />
              ) : (
                <Star key={index} className="size-5 stroke-primary-500-main" />
              ),
            )}
            <span className="ml-1 text-sm text-grayscale-600">
              ({recording.comments?.length || 0})
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <Users className="h-5 w-5 min-w-5" />
            Estudiantes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-grayscale-600">
          {students} estudiantes
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <CircleDollarSign className="h-5 w-5 min-w-5" />
            Precio
          </CardTitle>
        </CardHeader>
        <CardContent className="font-semibold text-grayscale-600">
          S/. {recording.price}
        </CardContent>
      </Card>
    </div>
  );
};
