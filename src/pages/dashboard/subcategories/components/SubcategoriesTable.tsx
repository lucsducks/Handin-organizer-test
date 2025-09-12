import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subcategory } from "@/models/category/category-subcategory.model";
import { Pencil, Tag, Trash2 } from "lucide-react";

interface SubcategoriesTableProps {
  subcategories: Subcategory[];
  onEditSubcategory: (subcategory: Subcategory) => void;
  onDeleteSubcategory: (subcategory: Subcategory) => void;
}

export const SubcategoriesTable: React.FC<SubcategoriesTableProps> = ({
  subcategories,
  onEditSubcategory,
  onDeleteSubcategory,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories.map((subcategory) => (
            <TableRow key={subcategory.id}>
              <TableCell className="font-medium">{subcategory.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>{subcategory.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 text-base">
                  <Button
                    intent="secondary"
                    size="sm"
                    onClick={() => onDeleteSubcategory(subcategory)}
                  >
                    <Trash2 className="size-4" />
                    Eliminar
                  </Button>
                  <Button
                    intent="primary"
                    size="sm"
                    onClick={() => onEditSubcategory(subcategory)}
                  >
                    <Pencil className="size-4" />
                    Editar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
