import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Facebook,
  Instagram,
  LinkIcon,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import React from "react";

interface OrganizerProfileContactInfoProps {
  organizerEmail: string;
  validSocialMedia: [string, string][];
  generateUniqueId: (prefix: string) => string;
}

const SOCIAL_ORDER = ["Linkedin", "Twitter", "Facebook", "Instagram"] as const;

const SOCIAL_ICONS = [
  <Linkedin className="h-5 w-5" />,
  <Twitter className="h-5 w-5" />,
  <Facebook className="h-5 w-5" />,
  <Instagram className="h-5 w-5" />,
];

export const OrganizerProfileContactInfo: React.FC<
  OrganizerProfileContactInfoProps
> = ({ organizerEmail, validSocialMedia, generateUniqueId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Contacto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center gap-2 text-grayscale-600">
          <Mail className="h-5 w-5" />
          <span>{organizerEmail}</span>
        </div>
        {validSocialMedia.map(([platform, url], index) => {
          const socialId = generateUniqueId("social");
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              key={socialId}
              className="flex flex-row items-center gap-2 text-grayscale-600 duration-200 hover:text-primary-500-main"
            >
              {SOCIAL_ICONS[index] || <LinkIcon className="h-5 w-5" />}
              <span>{SOCIAL_ORDER[index] || platform}</span>
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
};
