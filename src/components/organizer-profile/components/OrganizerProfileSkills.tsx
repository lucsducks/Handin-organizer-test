import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import React from "react";

interface OrganizerProfileSkillsProps {
  hasValidSkills: boolean;
  filteredSkills: string[];
}

export const OrganizerProfileSkills: React.FC<OrganizerProfileSkillsProps> = ({
  hasValidSkills,
  filteredSkills,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5" />
          Habilidades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 text-grayscale-600">
          {hasValidSkills ? (
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((skill, index) => (
                <Badge key={index} variant="neutral">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p>No hay habilidades registradas.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
