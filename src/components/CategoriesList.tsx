import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conference } from "@/models/conferences/conference.model";
import { Recording } from "@/models/recording/recording.model";
import { useCategoryStore } from "@/store/category-subcategory.store";
import { Search, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CategoriesListProps {
  selectedSubcategoryIds: string;
  onSubcategorySelect: (subcategoryIds: string[], categoryId: number) => void;
  data?: Recording | Conference | null;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  selectedSubcategoryIds,
  onSubcategorySelect,
  data,
}) => {
  const {
    categories,
    subcategories,
    isLoading,
    error,
    fetchCategories,
    fetchSubcategories,
    subcategoriesPagination,
    addSubcategory,
  } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    selectedSubcategoryIds.split(",").filter((name) => name.trim() !== ""),
  );
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const subcategoryScrollRef = useRef<HTMLDivElement>(null);

  const [subcategoryPage, setSubcategoryPage] = useState(0);
  const [loadingMoreCategories, setLoadingMoreCategories] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    if (data?.subcategories && data.subcategories.length > 0) {
      const firstSubcategory = data.subcategories[0];
      if (firstSubcategory.category) {
        const categoryId = firstSubcategory.category.id;
        setSelectedCategory(categoryId);
        fetchSubcategories({
          categoryId: categoryId,
          offset: 0,
          limit: pageSize,
        });
      }
      const subcategoryNames = data.subcategories.map((sub) => sub.title);
      setSelectedSubcategories(subcategoryNames);
      if (selectedCategory !== null) {
        onSubcategorySelect(subcategoryNames, selectedCategory);
      }
    } else {
      setSelectedCategory(null);
      setSelectedSubcategories([]);
    }
  }, [data]);

  useEffect(() => {
    loadCategories(0);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const timer = setTimeout(() => {
      setLoadingSubcategories(true);
      fetchSubcategories({
        categoryId: selectedCategory,
        offset: 0,
        limit: pageSize,
        term: searchTerm.trim() || undefined,
      }).finally(() => {
        setLoadingSubcategories(false);
      });
      setSubcategoryPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, fetchSubcategories]);

  const loadCategories = async (page: number) => {
    if (loadingMoreCategories) return;
    setLoadingMoreCategories(true);
    try {
      await fetchCategories({
        offset: page * pageSize,
        limit: pageSize,
      });
    } catch (error) {
    } finally {
      setLoadingMoreCategories(false);
    }
  };

  const loadMoreSubcategories = async () => {
    if (!selectedCategory || loadingSubcategories) return;
    const nextPage = subcategoryPage + 1;
    const hasMore =
      subcategoriesPagination &&
      nextPage * pageSize < subcategoriesPagination.total;
    if (!hasMore) return;
    setLoadingSubcategories(true);
    try {
      await fetchSubcategories({
        categoryId: selectedCategory,
        offset: nextPage * pageSize,
        limit: pageSize,
        term: searchTerm.trim() || undefined,
      });
      setSubcategoryPage(nextPage);
    } catch (error) {
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleSubcategoryScroll = () => {
    if (!subcategoryScrollRef.current || loadingSubcategories) return;
    const scrollArea = subcategoryScrollRef.current;
    const { scrollTop, scrollHeight, clientHeight } = scrollArea;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      loadMoreSubcategories();
    }
  };

  const handleCategorySelect = async (
    e: React.MouseEvent,
    categoryId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCategory(categoryId);
    setSelectedSubcategories([]);
    onSubcategorySelect([], categoryId);
    setSearchTerm("");
    setSubcategoryPage(0);
    setLoadingSubcategories(true);
    await fetchSubcategories({
      categoryId: categoryId,
      offset: 0,
      limit: pageSize,
    });
    setLoadingSubcategories(false);
  };

  const handleSubcategorySelect = (
    e: React.MouseEvent,
    subcategoryName: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedCategory === null) return;

    const updatedSubcategories = selectedSubcategories.includes(subcategoryName)
      ? selectedSubcategories.filter((name) => name !== subcategoryName)
      : [...selectedSubcategories, subcategoryName];
    setSelectedSubcategories(updatedSubcategories);
    onSubcategorySelect(updatedSubcategories, selectedCategory);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSubcategoryPage(0);
  };

  const handleAddNewSubcategory = () => {
    if (!searchTerm.trim() || selectedCategory === null) return;

    const exists = subcategories.some(
      (sub) => sub.title.toLowerCase() === searchTerm.toLowerCase(),
    );

    const alreadyAdded = selectedSubcategories.some(
      (name) => name.toLowerCase() === searchTerm.toLowerCase(),
    );

    if (!exists && !alreadyAdded) {
      const updatedSubcategories = [
        ...selectedSubcategories,
        searchTerm.trim(),
      ];
      setSelectedSubcategories(updatedSubcategories);
      onSubcategorySelect(updatedSubcategories, selectedCategory);
      setSearchTerm("");

      addSubcategory({
        title: searchTerm.trim(),
        categoryId: selectedCategory,
      });
    }
  };

  const handleRemoveSubcategory = (subcategoryName: string) => {
    if (selectedCategory === null) return;

    const updatedSubcategories = selectedSubcategories.filter(
      (name) => name !== subcategoryName,
    );
    setSelectedSubcategories(updatedSubcategories);
    onSubcategorySelect(updatedSubcategories, selectedCategory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewSubcategory();
    }
  };

  const noMatches = searchTerm.trim() !== "" && subcategories.length === 0;

  if (isLoading && !categories.length) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  return (
    <>
      <div className="space-y-1">
        <div className="flex flex-row gap-1">
          <span className="text-sm font-normal text-grayscale-500 md:text-base">
            Lista de Categorías
          </span>
          <span className="text-sm text-error md:text-base">*</span>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              type="button"
              intent={
                selectedCategory === category.id ? "primary" : "secondary"
              }
              size="sm"
              className="w-full justify-start"
              onClick={(e) => handleCategorySelect(e, category.id)}
            >
              {category.title}
            </Button>
          ))}
          {loadingMoreCategories && (
            <div className="flex justify-center py-2">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex flex-row gap-1">
          <span className="text-sm font-normal text-grayscale-500 md:text-base">
            Lista de Subcategorías
          </span>
          <span className="text-sm text-error md:text-base">*</span>
        </div>
        {selectedCategory ? (
          <div className="text-grayscale-600">
            <div className="mb-4 flex flex-col items-center gap-2 md:flex-row">
              <div className="relative w-full">
                <Input
                  icon={<Search />}
                  type="text"
                  placeholder="Buscar o crear subcategoría"
                  className="w-full"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-500-main duration-200 hover:bg-primary-100"
                  >
                    <XIcon className="size-4" />
                  </button>
                )}
              </div>
              <Button
                type="button"
                intent="primary"
                className="w-full md:w-fit"
                onClick={handleAddNewSubcategory}
                disabled={!searchTerm.trim()}
              >
                Agregar
              </Button>
            </div>
            {loadingSubcategories && subcategories.length === 0 ? (
              <div className="flex h-[248px] items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <ScrollArea
                className="h-[288px]"
                onScroll={handleSubcategoryScroll}
                ref={subcategoryScrollRef}
              >
                {selectedSubcategories.length > 0 && (
                  <div className="mr-4">
                    <h4 className="mb-1 text-sm text-grayscale-600">
                      Subcategorías seleccionadas:
                    </h4>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {selectedSubcategories.map((name, idx) => (
                        <div
                          key={`selected-${idx}`}
                          className="flex h-10 items-center gap-2 rounded-xl bg-primary-50 px-2 text-primary-500-main"
                        >
                          <span>{name}</span>

                          <button
                            onClick={() => handleRemoveSubcategory(name)}
                            type="button"
                            className="flex size-8 items-center justify-center rounded-full duration-200 hover:bg-primary-100"
                          >
                            <XIcon className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {noMatches && searchTerm.trim() !== "" ? (
                  <div className="rounded-md border border-dashed border-grayscale-400 p-4 text-center text-grayscale-600">
                    <p className="mb-2 text-sm">
                      No hay coincidencias para "{searchTerm}"
                    </p>
                    <p className="text-xs">
                      Presiona "Agregar" para crear esta subcategoría
                    </p>
                  </div>
                ) : (
                  <div className="mr-4 space-y-2">
                    {subcategories.length > 0
                      ? subcategories.map((subcategory) => (
                          <Button
                            key={subcategory.id}
                            type="button"
                            size="sm"
                            intent={
                              selectedSubcategories.includes(subcategory.title)
                                ? "primary"
                                : "secondary"
                            }
                            className="w-full justify-start"
                            onClick={(e) =>
                              handleSubcategorySelect(e, subcategory.title)
                            }
                          >
                            {subcategory.title}
                          </Button>
                        ))
                      : !noMatches && (
                          <div className="text-center text-grayscale-600">
                            No hay subcategorías disponibles
                          </div>
                        )}
                    {loadingSubcategories && subcategories.length > 0 && (
                      <div className="flex justify-center py-2">
                        <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-grayscale-400 p-4 text-grayscale-500">
            Selecciona una categoría primero
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesList;
