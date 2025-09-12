import { getResourceIcon } from "@/components/ResourceIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Resource } from "@/models/recording/recording.model";
import { Eye, Lock, Trash2 } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  index: number;
  onDeleteResource?: (resourceId: number) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  index,
  onDeleteResource,
}) => {
  const resourceTitle = resource.title || "Recurso sin título";
  const resourceDescription =
    resource.description || "Sin descripción disponible";

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-primary-100 bg-white p-4 shadow transition-shadow hover:shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          {getResourceIcon(resource.type)}
          <h3 className="font-medium text-grayscale-700">
            <span className="mr-2 rounded-full bg-grayscale-200 px-4 py-0.5 text-sm">
              {index + 1}
            </span>{" "}
            {resourceTitle}
          </h3>
        </div>
        {onDeleteResource && (
          <div className="ml-4 flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button intent="icon" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción eliminará el recurso "{resourceTitle}"
                    permanentemente. Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
                  <AlertDialogCancel className="w-full sm:w-auto">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDeleteResource(resource.id)}
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 sm:w-auto"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      <p className="text-sm leading-relaxed text-grayscale-600">
        {resourceDescription}
      </p>
      {resource.file && (
        <div className="flex flex-row items-center gap-2 border-t border-gray-200 pt-4 text-xs font-medium text-grayscale-500">
          <span className="text-xs tracking-wide">{resource.type}</span>
          <div className="h-full w-px bg-primary-300" />
          {resource.file.isPublic ? (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>Público</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>Privado</span>
            </div>
          )}
          <div className="h-full w-px bg-primary-300" />
          <span>ID: {resource.file.id}</span>
        </div>
      )}
      {!resource.file && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="text-xs font-medium text-yellow-700">
            No hay archivo asociado a este recurso
          </p>
        </div>
      )}
    </div>
  );
};
