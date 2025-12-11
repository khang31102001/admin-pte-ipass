import React, { useState } from "react";
import CategoryTreeItem from "./CategoryTreeItem";
import { CategoryItem } from "@/types/category";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";

interface CategoryTreeViewProps {
  tree: CategoryItem[];
  maxLevel?: number;
  onReorder?: (dragId: number, dropId: number) => void;
  onAddSubcategoryInline?: (values: Partial<CategoryItem>) => void;
  onDelete?: (categoryId: number) => void;
}

 const CategorySection: React.FC<CategoryTreeViewProps> = ({
  tree = [],
  maxLevel = 3,
  onReorder,
  onAddSubcategoryInline,
  onDelete,
}) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const navigation = useNavigate();

  const handleDragStart = (id: number) => {
    setDraggingId(id);
  };

  const handleDrop = (targetId: number) => {
    if (draggingId && draggingId !== targetId) {
      onReorder(draggingId, targetId);
    }
    setDraggingId(null);
  };

  const handleEdit = (slug: string) => {
    navigation(ROUTES.CATEGORIES.EDIT(slug));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 border-b border-gray-100 pb-2 text-sm font-semibold text-gray-800">
        Cây danh mục (tối đa {maxLevel} cấp)
      </h2>
      <ul className="space-y-1 text-sm">
        {tree.map((node, index) => (
          <CategoryTreeItem
            key={node.categoryId ?? index}
            node={node}
            level={1}
            maxLevel={maxLevel}
            onEdit={handleEdit}
            onReorderDrop={handleDrop}
            onDragStart={handleDragStart}
            draggingId={draggingId}
            onAddSubcategoryInline={onAddSubcategoryInline}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategorySection;