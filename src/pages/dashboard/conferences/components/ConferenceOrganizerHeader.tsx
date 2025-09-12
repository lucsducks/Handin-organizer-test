import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ConferenceOrganizerHeaderProps {
  onCreateConference: () => void;
}

export const ConferenceOrganizerHeader = ({
  onCreateConference,
}: ConferenceOrganizerHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
          Mis Conferencias
        </h1>
        <p className="text-sm text-grayscale-600">
          Gestiona tus conferencias en la plataforma
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:w-fit lg:justify-start">
        <Button onClick={onCreateConference} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Nueva conferencia
        </Button>
      </div>
    </div>
  );
};
