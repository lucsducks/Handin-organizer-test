import { Resource } from "@/models/recording/recording.model";




export type CreateResourceForm = {
  title: string;
  recordingId: number;
  description: string;
  url?: string;
  type: "Documento" | "Imagen" | "Enlace" | "Video" | "Archivo comprimido";
  file?: File | null;
};


export type DeleteResourceForm = Pick<Resource, "id">;
