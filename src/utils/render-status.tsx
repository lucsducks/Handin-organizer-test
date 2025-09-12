import { Badge } from "@/components/ui/badge";
import { ConferenceStatus } from "@/enums/conference-status.enum";
import { RecordingStatus } from "@/enums/recording-status.enum";

export const renderRecordingStatus = (status: string) => {
  switch (status) {
    case RecordingStatus.PUBLISHED:
      return <Badge variant="success">Publicado</Badge>;
    case RecordingStatus.DRAFT:
      return <Badge variant="warning">Borrador</Badge>;
    case RecordingStatus.INACTIVE:
      return <Badge variant="neutral">Inactivo</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const renderConferenceStatus = (status: string) => {
  switch (status) {
    case ConferenceStatus.ON_GOING:
      return <Badge>En curso</Badge>;
    case ConferenceStatus.FINISHED:
      return <Badge variant="neutral">Finalizada</Badge>;
    case ConferenceStatus.CANCELED:
      return <Badge variant="error">Cancelada</Badge>;
    case ConferenceStatus.SCHEDULED:
      return <Badge variant="warning">Programada</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
