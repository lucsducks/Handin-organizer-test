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
import { RecordingDetail } from "@/models/recording/recording.model";
import { renderRecordingStatus } from "@/utils/render-status";
import { renderVerificationStatus } from "@/utils/render-verification";
import { FolderTree, Users } from "lucide-react";
import React from "react";

interface RecordingsAdminTableProps {
  recordings: RecordingDetail[];
  onNavigateToContent: (recordingId: string) => void;
}

export const RecordingsAdminTable: React.FC<RecordingsAdminTableProps> = ({
  recordings,
  onNavigateToContent,
}) => {
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
          {recordings.map((recording: RecordingDetail) => {
            const recordingData = recording.recording;

            return (
              recordingData && (
                <TableRow
                  key={recordingData.id}
                  className={
                    recordingData.verificationStatus === "Pendiente"
                      ? "bg-orange-50/20"
                      : ""
                  }
                >
                  <TableCell>
                    <div className="relative aspect-video h-16 overflow-hidden rounded-md">
                      <img
                        src={recordingData.banner.publicUrl}
                        alt={recordingData.title}
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
                      {recordingData.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 min-w-64">
                      {recordingData.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      {parseFloat(recordingData.price) === 0 ? (
                        <span>Gratis</span>
                      ) : (
                        <>PEN {parseFloat(recordingData.price).toFixed(2)}</>
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
                    {renderRecordingStatus(recordingData.status)}
                  </TableCell>
                  <TableCell>
                    {renderVerificationStatus(recordingData.verificationStatus)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 text-base">
                      <Button
                        size="sm"
                        intent="secondary"
                        onClick={() =>
                          onNavigateToContent(recordingData.id.toString())
                        }
                      >
                        <FolderTree className="mr-1 size-4" />
                        Contenido
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
