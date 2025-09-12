import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building, Mail } from "lucide-react";
import React from "react";

interface OrganizerListCardProps {
  organizer: any;
  onNavigateToOrganizer: (organizerId: number) => void;
}

export const OrganizerListCard: React.FC<OrganizerListCardProps> = ({
  organizer,
  onNavigateToOrganizer,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-grayscale-800 md:text-xl">
                {organizer.user?.firstName} {organizer.user?.lastName}
              </h2>
              <Badge variant={organizer.verified ? "default" : "warning"}>
                {organizer.verified ? "Verificado" : "Pendiente"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-grayscale-600">
              {organizer.specialty}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center text-grayscale-600">
          <Mail className="mr-2 h-4 w-4" />
          {organizer.user?.email}
        </div>
        <div className="flex items-center text-grayscale-600">
          <Building className="mr-2 h-4 w-4" />
          {organizer.degree}
        </div>
        <div className="flex items-center gap-2 text-grayscale-600">
          <span>RUC</span>
          {organizer.specialty}
        </div>
        {/* <div className="flex items-center text-grayscale-600">
          <Briefcase className="mr-2 h-4 w-4" />
          {organizer.experience?.length || 0} experiencias
        </div>
        <div className="flex items-center text-grayscale-600">
          <Award className="mr-2 h-4 w-4" />
          {organizer.certifications?.length || 0} certificaciones
        </div> */}
      </CardContent>
      <CardFooter className="justify-center border-t pt-4">
        <Button size="sm" onClick={() => onNavigateToOrganizer(organizer.id)}>
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
};
