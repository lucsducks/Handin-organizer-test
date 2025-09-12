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
import { Subcategory } from "@/models/category/category-subcategory.model";

interface SubcategoryModalProps {
  isOpen: boolean;
  selectedSubcategory: Subcategory | null;
  formData: { title: string };
  formError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: { title: string }) => void;
}

export const SubcategoryModal: React.FC<SubcategoryModalProps> = ({
  isOpen,
  selectedSubcategory,
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
            {selectedSubcategory ? "Editar Subcategoría" : "Nueva Subcategoría"}
          </DialogTitle>
          <DialogDescription>
            {selectedSubcategory
              ? "Modifica los detalles de la subcategoría"
              : "Completa los detalles para crear una nueva subcategoría"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            id="title"
            value={formData.title}
            label="Título"
            onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
            placeholder="Título de la subcategoría"
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
            <Button type="submit" intent="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  Procesando
                </>
              ) : selectedSubcategory ? (
                "Guardar Cambios"
              ) : (
                "Crear Subcategoría"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
