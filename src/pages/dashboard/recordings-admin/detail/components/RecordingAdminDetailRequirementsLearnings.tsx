import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListCheck, ListCollapse } from "lucide-react";
import React from "react";

interface RecordingAdminDetailRequirementsLearningsProps {
  recording: any;
}

export const RecordingAdminDetailRequirementsLearnings: React.FC<
  RecordingAdminDetailRequirementsLearningsProps
> = ({ recording }) => {
  return (
    <div className="flex flex-col gap-4 2xl:grid 2xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <ListCheck className="h-5 w-5 min-w-5" />
            Requerimientos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-3">
            {recording.requirements && recording.requirements.length > 0 ? (
              recording.requirements
                .flatMap((requirement: String) => requirement.split(","))
                .map((item: any) => item.trim())
                .filter((item: any) => item !== "")
                .map((item: any, index: number) => (
                  <li
                    key={`requirement-${index}`}
                    className="text-grayscale-600"
                  >
                    {item}
                  </li>
                ))
            ) : (
              <li className="text-grayscale-600">
                No hay requerimientos especificados
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <ListCollapse className="h-5 w-5 min-w-5" />
            Lo que aprenderán
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-3">
            {recording.learnings && recording.learnings.length > 0 ? (
              recording.learnings
                .flatMap((learning: any) => learning.split(","))
                .map((item: any) => item.trim())
                .filter((item: any) => item !== "")
                .map((item: any, index: number) => (
                  <li key={`learning-${index}`} className="text-grayscale-600">
                    {item}
                  </li>
                ))
            ) : (
              <li className="text-grayscale-600">
                No hay objetivos de aprendizaje especificados
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
