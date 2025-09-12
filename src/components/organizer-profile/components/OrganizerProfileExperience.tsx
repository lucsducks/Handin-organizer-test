import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import React from "react";

interface OrganizerProfileExperienceProps {
  validExperience: any[];
  generateUniqueId: (prefix: string) => string;
}

export const OrganizerProfileExperience: React.FC<
  OrganizerProfileExperienceProps
> = ({ validExperience, generateUniqueId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Experiencia Profesional
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {validExperience.length > 0 ? (
          validExperience.map((exp) => {
            const expId = generateUniqueId("experience");
            return (
              <CardContent key={expId} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-grayscale-800">
                    {exp.position}
                  </h4>
                </div>
                <div className="flex items-center text-sm text-grayscale-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  {exp.startDate} - {exp.endDate || "Presente"}
                </div>
                <p className="text-sm font-medium text-grayscale-600">
                  {exp.company}
                </p>
                {exp.description && (
                  <p className="text-sm text-grayscale-600">
                    {exp.description}
                  </p>
                )}
              </CardContent>
            );
          })
        ) : (
          <p>No hay experiencia laboral registrada.</p>
        )}
      </CardContent>
    </Card>
  );
};
