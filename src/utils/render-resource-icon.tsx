import { ResourceTypes } from "@/enums/resource-types.enum";
import {
  FileArchive,
  FileText,
  Image,
  LinkIcon,
  MonitorPlay,
} from "lucide-react";

export const renderResourceIcon = (type: string) => {
  switch (type) {
    case ResourceTypes.DOCUMENT:
      return <FileText className="size-4 text-grayscale-700" />;
    case ResourceTypes.VIDEO:
      return <MonitorPlay className="size-4 text-grayscale-700" />;
    case ResourceTypes.LINK:
      return <LinkIcon className="size-4 text-grayscale-700" />;
    case ResourceTypes.IMAGE:
      return <Image className="size-4 text-grayscale-700" />;
    case ResourceTypes.COMPRESSED:
      return <FileArchive className="size-4 text-grayscale-700" />;
    default:
      return <FileText className="size-4 text-grayscale-700" />;
  }
};
