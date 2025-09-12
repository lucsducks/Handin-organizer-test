import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, LinkIcon } from "lucide-react";
import React from "react";

interface OrganizerProfileCertificationsProps {
  validCertifications: any[];
  generateUniqueId: (prefix: string) => string;
  formatDate: (date: string) => string;
}

export const OrganizerProfileCertifications: React.FC<
  OrganizerProfileCertificationsProps
> = ({ validCertifications, generateUniqueId, formatDate }) => {
  if (validCertifications.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {validCertifications.map((cert) => {
          const certId = generateUniqueId("certification");
          return (
            <CardContent key={certId}>
              <div className="flex items-start">
                <div className="space-y-1">
                  <h4 className="font-medium text-grayscale-800">
                    {cert.name}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center duration-200 hover:text-primary-500-main"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </a>
                    )}
                  </h4>
                  <p className="text-sm font-medium text-grayscale-600">
                    {cert.institution}
                  </p>
                  <p className="text-sm text-grayscale-600">
                    Emitido: {formatDate(cert.issueDate)}
                  </p>
                  {cert.expirationDate && (
                    <p className="text-sm text-grayscale-600">
                      Expira: {formatDate(cert.expirationDate)}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-sm text-grayscale-600">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          );
        })}
      </CardContent>
    </Card>
  );
};
