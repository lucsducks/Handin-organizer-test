import placeImage from "@/assets/img/profile-default.webp";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderRecordingStatus } from "@/utils/render-status";
import { renderVerificationStatus } from "@/utils/render-verification";
import { FolderTree, Pencil, Users } from "lucide-react";
import React from "react";

interface RecordingsOrganizerGridTableProps {
  recordings: any[];
  onEdit: (recording: any) => void;
  onNavigateToContent: (recordingId: number) => void;
}

export const RecordingsOrganizerGridTable: React.FC<
  RecordingsOrganizerGridTableProps
> = ({ recordings, onEdit, onNavigateToContent }) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banner</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estudiantes</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Verificación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recordings.map(
            (recording) =>
              recording.recording && (
                <TableRow key={recording.recording.id}>
                  <TableCell>
                    <div className="relative aspect-video h-16 overflow-hidden rounded-md">
                      <img
                        src={recording.recording.banner.publicUrl}
                        alt={recording.recording.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = placeImage;
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="line-clamp-2 min-w-52">
                      {recording.recording.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 min-w-64">
                      {recording.recording.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      {parseFloat(recording.recording.price) === 0 ? (
                        <span>Gratis</span>
                      ) : (
                        <>
                          PEN {parseFloat(recording.recording.price).toFixed(2)}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-grayscale-600" />
                      <span>{recording.students || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderRecordingStatus(recording.recording.status)}
                  </TableCell>
                  <TableCell>
                    {renderVerificationStatus(
                      recording.recording.verificationStatus,
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 text-base">
                      <Button
                        size="sm"
                        intent="secondary"
                        onClick={() =>
                          onNavigateToContent(recording.recording.id)
                        }
                      >
                        <FolderTree className="size-4" />
                        Contenido
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onEdit(recording.recording)}
                      >
                        <Pencil className="size-4" />
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};
