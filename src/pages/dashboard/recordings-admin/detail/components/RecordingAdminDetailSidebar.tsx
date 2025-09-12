import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Tag, Tags, User } from "lucide-react";
import React from "react";

interface RecordingAdminDetailSidebarProps {
  recording: any;
}

export const RecordingAdminDetailSidebar: React.FC<
  RecordingAdminDetailSidebarProps
> = ({ recording }) => {
  return (
    <section className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <Image className="size-5" />
            Banner de la Grabación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-gray-100">
            {recording.banner?.publicUrl ? (
              <img
                src={recording.banner.publicUrl}
                alt={`Banner de la grabación ${recording.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-sm text-grayscale-500">
                No hay banner disponible
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <Tag className="size-5" />
            Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recording.subcategories &&
          recording.subcategories.length > 0 &&
          recording.subcategories[0].category ? (
            <Badge variant="neutral">
              {recording.subcategories[0].category.title}
            </Badge>
          ) : (
            <p className="text-grayscale-600">No hay categoría asignada</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <Tags className="size-5" />
            Subcategorías
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {recording.subcategories && recording.subcategories.length > 0 ? (
            recording.subcategories.map((subcategory: any) => (
              <Badge key={subcategory.id} variant="neutral">
                {subcategory.title}
              </Badge>
            ))
          ) : (
            <p className="text-grayscale-600">No hay subcategorías</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-grayscale-700">
            <User className="size-5" />
            Información del Organizador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium text-grayscale-600">
                  {recording.organizer?.user?.firstName}{" "}
                  {recording.organizer?.user?.lastName}
                </h3>
                <p className="text-sm text-grayscale-600">
                  {recording.organizer?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
