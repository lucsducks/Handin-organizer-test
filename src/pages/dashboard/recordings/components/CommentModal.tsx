import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Comment } from "@/models/comment/comment.model";
import {
  MessageSquare,
  RotateCcw,
  Search,
  Star,
  UserIcon,
  X,
} from "lucide-react";
import React from "react";

interface RecordingCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  recordingTitle?: string;
  isLoading: boolean;
  totalComments: number;
  hasMore: boolean;
  searchTerm: string;
  selectedRating: number;
  averageRating: string;
  onSearchChange: (value: string) => void;
  onRatingChange: (rating: number) => void;
  onResetFilters: () => void;
  onLoadMore: () => void;
}

export const RecordingCommentsModal: React.FC<RecordingCommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
  recordingTitle,
  isLoading,
  totalComments,
  hasMore,
  searchTerm,
  selectedRating,
  averageRating,
  onSearchChange,
  onRatingChange,
  onResetFilters,
  onLoadMore,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= numRating
              ? "fill-primary-500-main text-primary-500-main"
              : "text-primary-500-main"
          }`}
        />,
      );
    }

    return stars;
  };

  const ratingOptions = [
    { value: 0, label: "Todos" },
    { value: 5, label: "5 estrellas" },
    { value: 4, label: "4 estrellas" },
    { value: 3, label: "3 estrellas" },
    { value: 2, label: "2 estrellas" },
    { value: 1, label: "1 estrella" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[90vh] w-full flex-col gap-4 rounded-2xl bg-white p-6 sm:max-w-[725px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-grayscale-200 pb-4">
          <div className="flex flex-col space-y-1.5 border-grayscale-200 text-center sm:text-left">
            <h2 className="text-2xl font-semibold leading-none tracking-tight text-grayscale-800">
              Comentarios y Calificaciones
            </h2>
            {recordingTitle && (
              <p className="text-sm text-grayscale-600">{recordingTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-sm text-grayscale-600 transition-opacity hover:text-primary-500-main focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-grayscale-50 border-b border-grayscale-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-grayscale-700">
                  {averageRating}
                </span>
                <div className="flex">{renderStars(averageRating)}</div>
              </div>
              <div className="h-6 w-px bg-grayscale-300"></div>
              <span className="text-sm text-grayscale-600">
                {totalComments} comentario{totalComments !== 1 ? "s" : ""} total
                {totalComments !== 1 ? "es" : ""}
              </span>
              {comments.length < totalComments && (
                <>
                  <div className="h-6 w-px bg-grayscale-300"></div>
                  <span className="text-sm text-grayscale-500">
                    Mostrando {comments.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="border-b border-grayscale-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              className="flex-1"
              icon={<Search />}
              type="text"
              placeholder="Buscar en comentarios..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="w-full sm:max-w-40">
              <Select
                value={selectedRating.toString()}
                onValueChange={(value) => onRatingChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={onResetFilters}
              intent="secondary"
              className="w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Limpiar</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading && comments.length === 0 ? (
            <div className="flex items-center justify-center">
              <Spinner />
              <span className="ml-3 text-grayscale-600">
                Cargando comentarios...
              </span>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-grayscale-100">
                <MessageSquare className="h-8 w-8 text-grayscale-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-grayscale-800">
                {searchTerm || selectedRating > 0
                  ? "No se encontraron comentarios"
                  : "Sin comentarios aún"}
              </h3>
              <p className="max-w-md text-center text-grayscale-600">
                {searchTerm || selectedRating > 0
                  ? "Intenta ajustar los filtros para encontrar más comentarios."
                  : "Esta grabación aún no tiene comentarios de los estudiantes."}
              </p>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex flex-col gap-4">
                    <div className="h-[1px] w-full border-b border-grayscale-200" />
                    <div className="flex flex-row items-start gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-500-main">
                        <span>
                          <UserIcon className="size-5" />
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <h2 className="text-sm font-medium text-grayscale-700">
                          {comment.user.firstName} {comment.user.lastName}
                        </h2>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <div className="flex flex-row items-center">
                            {Array.from({ length: 5 }, (_, index) =>
                              index < Number(comment.rating) ? (
                                <Star
                                  key={index}
                                  className="fill-primary-500-main"
                                  strokeWidth={0}
                                  size={14}
                                />
                              ) : (
                                <Star
                                  key={index}
                                  className="stroke-primary-500-main"
                                  size={14}
                                />
                              ),
                            )}
                          </div>
                          <span className="text-sm text-grayscale-600">
                            {formatDate(comment.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-grayscale-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={onLoadMore}
                    intent="tertiary"
                    size="sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner />
                        Cargando...
                      </>
                    ) : (
                      "Ver más"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end border-t border-grayscale-200 pt-4">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};
