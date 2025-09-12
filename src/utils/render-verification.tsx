import { Badge } from "@/components/ui/badge";
import { VerificationStatus } from "@/enums/verification-status.enum";

export const renderVerificationStatus = (status: string) => {
  switch (status) {
    case VerificationStatus.VERIFIED:
      return <Badge>Verificado</Badge>;
    case VerificationStatus.REJECTED:
      return <Badge variant="error">Rechazado</Badge>;
    case VerificationStatus.PENDING:
      return <Badge variant="warning">Pendiente</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
