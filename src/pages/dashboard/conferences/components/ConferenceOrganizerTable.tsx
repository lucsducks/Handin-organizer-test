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
import { ConferenceStatus } from "@/enums/conference-status.enum";
import { ConferenceTypes } from "@/enums/conference-types.enum";
import {
  Conference,
  ConferenceDetail,
} from "@/models/conferences/conference.model";
import { dateUtils } from "@/utils/date.utils";
import { renderConferenceStatus } from "@/utils/render-status";
import { ExternalLink, Pencil, Play, Square, Users } from "lucide-react";

interface ConferenceOrganizerTableProps {
  conferences: ConferenceDetail[];
  onOpenEnrollmentsModal: (conference: Conference) => void;
  onJoin: (id: number, startDate: string, name: string) => void;
  onEdit: (conference: Conference) => void;
  onStart: (conference: Conference) => void;
  onFinish: (conference: Conference) => void;
  isJoining: boolean;
  isChangeState: boolean;
}

export const ConferenceOrganizerTable = ({
  conferences,
  onOpenEnrollmentsModal,
  onJoin,
  onEdit,
  onStart,
  onFinish,
  isJoining,
  isChangeState,
}: ConferenceOrganizerTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banner</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Aforo</TableHead>
            <TableHead>Participantes</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conferences.map(
            (conference) =>
              conference.conference && (
                <TableRow key={conference.conference.id}>
                  <TableCell>
                    <div className="relative aspect-video h-16 overflow-hidden rounded-md">
                      <img
                        src={
                          conference.conference.banner.publicUrl || placeImage
                        }
                        alt={conference.conference.title}
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
                      {conference.conference.title}
                    </div>
                  </TableCell>
                  <TableCell>{conference.conference.type}</TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-2">
                      {(conference.conference.type ===
                        ConferenceTypes.IN_PERSON ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">Presencial</span>
                          {conference.conference.seats &&
                          conference.conference.seats.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              {conference.conference.seats
                                .slice(0, 2)
                                .map((seat, index) => (
                                  <span key={index} className="text-xs">
                                    {seat.name}:{" "}
                                    {Number(seat.price) === 0
                                      ? "Gratis"
                                      : `PEN ${seat.price}`}
                                  </span>
                                ))}
                              {conference.conference.seats.length > 2 && (
                                <span className="text-xs text-gray-500">
                                  +{conference.conference.seats.length - 2} más
                                </span>
                              )}
                            </div>
                          ) : (
                            <span>Sin entradas</span>
                          )}
                        </div>
                      )}
                      {conference.conference.type ===
                        ConferenceTypes.HYBRID && (
                        <div className="h-8 w-[1px] bg-grayscale-400" />
                      )}
                      {(conference.conference.type ===
                        ConferenceTypes.VIRTUAL ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">Virtual</span>
                          <span>
                            {Number(conference.conference.virtualPrice ?? 0) ===
                            0
                              ? "Gratis"
                              : `PEN ${conference.conference.virtualPrice}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 min-w-36 max-w-36">
                      {dateUtils.formatDateTime(
                        conference.conference.startDate,
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2">
                      {conference.conference.location
                        ? conference.conference.location
                        : "Conferencia virtual"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-2">
                      {(conference.conference.type ===
                        ConferenceTypes.IN_PERSON ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">Presencial</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {conference.conference.seats?.reduce(
                                (total, seat) =>
                                  total + (seat.maxParticipants || 0),
                                0,
                              ) || 0}
                            </span>
                          </div>
                        </div>
                      )}
                      {conference.conference.type ===
                        ConferenceTypes.HYBRID && (
                        <div className="h-8 w-[1px] bg-grayscale-400" />
                      )}
                      {(conference.conference.type ===
                        ConferenceTypes.VIRTUAL ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">Virtual</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {conference.conference.maxVirtualParticipants ||
                                0}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-2">
                      {(conference.conference.type ===
                        ConferenceTypes.IN_PERSON ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">Presencial</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {conference.attendees.inPersonAttendees || 0}
                            </span>
                          </div>
                        </div>
                      )}
                      {conference.conference.type ===
                        ConferenceTypes.HYBRID && (
                        <div className="h-8 w-[1px] bg-grayscale-400" />
                      )}
                      {(conference.conference.type ===
                        ConferenceTypes.VIRTUAL ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">Virtual</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {conference.attendees.virtualAttendees || 0}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderConferenceStatus(conference.conference.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 text-base">
                      <Button
                        size="icon"
                        intent="secondary"
                        onClick={() =>
                          onOpenEnrollmentsModal(conference.conference)
                        }
                      >
                        <Users className="size-4" />
                      </Button>

                      {(conference.conference.type ===
                        ConferenceTypes.VIRTUAL ||
                        conference.conference.type ===
                          ConferenceTypes.HYBRID) &&
                        conference.conference.status !==
                          ConferenceStatus.FINISHED && (
                          <Button
                            size="sm"
                            onClick={() =>
                              onJoin(
                                conference.conference.id,
                                conference.conference.startDate,
                                conference.conference.title,
                              )
                            }
                            disabled={isJoining}
                          >
                            <ExternalLink className="size-4" />
                            Unirse
                          </Button>
                        )}

                      {conference.conference.status ===
                        ConferenceStatus.SCHEDULED && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => onEdit(conference.conference)}
                          >
                            <Pencil className="size-4" />
                            Editar
                          </Button>

                          {conference.conference.type ===
                            ConferenceTypes.IN_PERSON && (
                            <Button
                              size="sm"
                              onClick={() => onStart(conference.conference)}
                              disabled={isChangeState}
                            >
                              <Play className="size-4" />
                              Iniciar
                            </Button>
                          )}
                        </>
                      )}

                      {conference.conference.status ===
                        ConferenceStatus.ON_GOING && (
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => onFinish(conference.conference)}
                          disabled={isChangeState}
                        >
                          <Square className="size-4" />
                          Finalizar
                        </Button>
                      )}
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
