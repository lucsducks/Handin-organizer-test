import { CategoriesGrid } from "./components/CategoriesGrid";

export default function CategoriesPage() {
  return (
    <article className="flex flex-1 flex-col gap-4 p-4 lg:p-8">
      <CategoriesGrid />
    </article>
  );
}
