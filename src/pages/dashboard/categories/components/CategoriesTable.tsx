import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/models/category/category-subcategory.model";
import { FolderTree, Pencil } from "lucide-react";

interface CategoriesTableProps {
  categories: Category[];
  onEditCategory: (category: Category) => void;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  onEditCategory,
}) => {
  const navigate = useNavigate();

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
          {categories.map((category: Category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 text-base">
                  <Button
                    size="sm"
                    intent="secondary"
                    onClick={() =>
                      navigate(
                        `/dashboard/categories/${category.id}/subcategories/name/${category.title}`,
                      )
                    }
                  >
                    <FolderTree className="size-4" />
                    Subcategorías
                  </Button>
                  <Button size="sm" onClick={() => onEditCategory(category)}>
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
