import { FileText, Image, Music, Video } from "lucide-react";

export const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "image":
      return <Image className="h-5 w-5 min-w-5 text-grayscale-600" />;
    case "video":
      return <Video className="h-5 w-5 min-w-5 text-grayscale-600" />;
    case "audio":
      return <Music className="h-5 w-5 min-w-5 text-grayscale-600" />;
    case "document":
      return <FileText className="h-5 w-5 min-w-5 text-grayscale-600" />;
    default:
      return <FileText className="h-5 w-5 min-w-5 text-grayscale-600" />;
  }
};
export const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "image":
      return "bg-blue-100 text-blue-800";
    case "video":
      return "bg-purple-100 text-purple-800";
    case "audio":
      return "bg-green-100 text-green-800";
    case "document":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
