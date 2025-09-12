import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, School } from "lucide-react";
import React from "react";

interface OrganizerProfileEducationProps {
  validEducation: any[];
  generateUniqueId: (prefix: string) => string;
}

export const OrganizerProfileEducation: React.FC<
  OrganizerProfileEducationProps
> = ({ validEducation, generateUniqueId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <School className="h-5 w-5" />
          Educación
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-grayscale-600">
        {validEducation.length > 0 ? (
          validEducation.map((edu) => {
            const eduId = generateUniqueId("education");
            return (
              <CardContent key={eduId} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-grayscale-800">
                    {edu.degree}
                  </h4>
                </div>
                <div className="flex items-center text-sm text-grayscale-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  {edu.startDate} - {edu.endDate || "Presente"}
                </div>
                <p className="text-sm font-medium text-grayscale-600">
                  {edu.institution}
                </p>
                <p className="text-sm text-grayscale-600">{edu.field}</p>
              </CardContent>
            );
          })
        ) : (
          <p>No hay información educativa disponible.</p>
        )}
      </CardContent>
    </Card>
  );
};
