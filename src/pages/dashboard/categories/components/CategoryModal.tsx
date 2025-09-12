import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { Category } from "@/models/category/category-subcategory.model";

interface CategoryModalProps {
  isOpen: boolean;
  selectedCategory: Category | null;
  formData: { title: string };
  formError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: { title: string }) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  selectedCategory,
  formData,
  formError,
  isSubmitting,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedCategory ? "Editar Categoría" : "Nueva Categoría"}
          </DialogTitle>
          <DialogDescription>
            {selectedCategory
              ? "Modifica los detalles de la categoría"
              : "Completa los detalles para crear una nueva categoría"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            id="title"
            value={formData.title}
            label="Título"
            onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
            placeholder="Título de la categoría"
            error={formError}
          />
          <DialogFooter>
            <Button
              type="button"
              intent="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  Procesando
                </>
              ) : selectedCategory ? (
                "Guardar Cambios"
              ) : (
                "Crear Categoría"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
