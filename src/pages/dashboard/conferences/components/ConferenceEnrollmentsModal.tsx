import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Conference } from "@/models/conferences/conference.model";
import { ConferenceEnrollments } from "@/models/enrollments/conference-enrollment.model";
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from "xlsx";
import { useState, useEffect } from "react";
import { markAttendance, unmarkAttendance } from "@/api/conference-enrollments.api";
import { toast } from "react-toastify";

interface ConferenceEnrollmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedConference: Conference | null;
  selectedConferenceEnrollments: ConferenceEnrollments | null;
}

export const ConferenceEnrollmentsModal = ({
  isOpen,
  onClose,
  selectedConference,
  selectedConferenceEnrollments,
}: ConferenceEnrollmentsModalProps) => {
  const [loadingAttendance, setLoadingAttendance] = useState<number | null>(null);
  const [enrollments, setEnrollments] = useState(selectedConferenceEnrollments);

  // Sincronizar estado local cuando cambien las props
  useEffect(() => {
    setEnrollments(selectedConferenceEnrollments);
  }, [selectedConferenceEnrollments]);

  const downloadExcel = () => {
    if (!enrollments) return;

    const data = enrollments.enrollments.map(
      (enrollment) => ({
        Ticket: enrollment.id,
        Tipo: enrollment.ticketType,
        Nombre: enrollment.user.firstName,
        Apellido: enrollment.user.lastName,
        Asistió: enrollment.attendedAt ? "Sí" : "No",
      }),
    );

    const worksheet = xlsxUtils.json_to_sheet(data);
    const workbook = xlsxUtils.book_new();
    xlsxUtils.book_append_sheet(workbook, worksheet, "Participantes");

    xlsxWriteFile(workbook, `participantes_${selectedConference?.title}.xlsx`);
  };

  const handleAttendanceToggle = async (enrollmentId: number, currentAttendance: boolean) => {
    if (!selectedConference) return;

    setLoadingAttendance(enrollmentId);

    try {
      if (currentAttendance) {
        await unmarkAttendance(selectedConference.id, enrollmentId)
          .then(() => {
            setEnrollments(prev => {
              if (!prev) return prev;
              return {
                ...prev,
                enrollments: prev.enrollments.map(enrollment =>
                  enrollment.id === enrollmentId
                    ? { ...enrollment, attendedAt: false }
                    : enrollment
                )
              };
            });
          });
      } else {
        await markAttendance(selectedConference.id, enrollmentId)
          .then(() => {
            setEnrollments(prev => {
              if (!prev) return prev;
              return {
                ...prev,
                enrollments: prev.enrollments.map(enrollment =>
                  enrollment.id === enrollmentId
                    ? { ...enrollment, attendedAt: true }
                    : enrollment
                )
              };
            });
          });
      }
    } catch (error) {
      toast.error('Error al actualizar asistencia');
    } finally {
      setLoadingAttendance(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="overflow-y-auto sm:max-w-[925px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{selectedConference?.title}</DialogTitle>
          <DialogDescription>
            Visualiza los participantes de tu conferencia
          </DialogDescription>
        </DialogHeader>
        {enrollments && enrollments.total > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-grayscale-600">
                Total: {enrollments.total}
              </span>
              <div className="space-x-2">
                <button
                  onClick={downloadExcel}
                  className="rounded bg-green-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-700"
                >
                  Descargar Excel
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Asistió</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.enrollments.map(
                    (enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>{enrollment.id}</TableCell>
                        <TableCell>{enrollment.ticketType}</TableCell>
                        <TableCell>{enrollment.user.firstName}</TableCell>
                        <TableCell>{enrollment.user.lastName}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${enrollment.attendedAt
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {enrollment.attendedAt ? "Sí" : "No"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {enrollment.ticketType === 'Presencial' ? (
                            <button
                              onClick={() => handleAttendanceToggle(enrollment.id, !!enrollment.attendedAt)}
                              disabled={loadingAttendance === enrollment.id}
                              className={`rounded px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${enrollment.attendedAt
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                              {loadingAttendance === enrollment.id
                                ? 'Procesando...'
                                : enrollment.attendedAt
                                  ? 'Marcar como ausente'
                                  : 'Marcar como presente'
                              }
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">No aplicable</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-grayscale-400 bg-white p-12 text-center text-grayscale-600">
            Aún no tienes participantes
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};