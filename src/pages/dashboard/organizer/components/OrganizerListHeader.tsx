import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Clock,
  RefreshCw,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import React from "react";

interface Statistics {
  total: number;
  verified: number;
  unverified: number;
  active: number;
  inactive: number;
}

interface OrganizerListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statistics?: Statistics;
  total?: number;
  onRefresh?: () => void;
}

export const OrganizerListHeader: React.FC<OrganizerListHeaderProps> = ({
  searchTerm,
  onSearchChange,
  statistics,
  onRefresh,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
              Organizadores
            </h1>
            {statistics && (
              <Badge className="ml-2">
                <Users className="mr-1 h-3 w-3" />
                {statistics.total}
              </Badge>
            )}
          </div>
          <p className="text-sm text-grayscale-600">
            Gestiona los Organizadores de tu plataforma
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Botón de refrescar */}
          {onRefresh && (
            <Button
              size="sm"
              intent="secondary"
              onClick={onRefresh}
              className="flex w-full items-center gap-2 sm:w-fit"
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>
          )}

          <div className="relative min-w-[250px]">
            <Input
              type="text"
              placeholder="Buscar Organizadores..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              icon={<Search />}
            />
          </div>
        </div>
      </div>

      {statistics && statistics.total > 0 && (
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="success"
            className="flex items-center gap-2 rounded-lg px-3 py-2"
          >
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">
              Activos: {statistics.active}
            </span>
          </Badge>
          <Badge className="flex items-center gap-2 rounded-lg px-3 py-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Verificados: {statistics.verified}
            </span>
          </Badge>
          <Badge
            variant="warning"
            className="int flex items-center gap-2 rounded-lg px-3 py-2"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              Pendientes: {statistics.unverified}
            </span>
          </Badge>

          {statistics.inactive > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <XCircle className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-grayscale-700">
                Inactivos: {statistics.inactive}
              </span>
            </div>
          )}
        </div>
      )}

      {searchTerm && (
        <div className="flex items-center gap-2 text-sm text-grayscale-600">
          <Search className="h-4 w-4" />
          <span>
            Mostrando resultados para: <strong>"{searchTerm}"</strong>
          </span>
          <Button
            size="sm"
            intent="tertiary"
            onClick={() => onSearchChange("")}
            className="text-xs"
          >
            Limpiar filtro
          </Button>
        </div>
      )}
    </div>
  );
};
