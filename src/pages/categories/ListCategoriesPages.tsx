import React, { useState } from "react";
import type { CategoryNode } from "@/utils/categoryTree";
import CategoryTreeItem from "./CategoryTreeItem";

interface CategoryTreeViewProps {
  tree: CategoryNode[];
  maxLevel?: number;
  onEdit: (id: number) => void;
  onReorder: (dragId: number, dropId: number) => void;
  onAddSubcategoryInline: (parentId: number, name: string) => void;
}

 const ListCategoriesPages: React.FC<CategoryTreeViewProps> = ({
  tree,
  maxLevel = 3,
  onEdit,
  onReorder,
  onAddSubcategoryInline,
}) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart = (id: number) => {
    setDraggingId(id);
  };

  const handleDrop = (targetId: number) => {
    if (draggingId && draggingId !== targetId) {
      onReorder(draggingId, targetId);
    }
    setDraggingId(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 border-b border-gray-100 pb-2 text-sm font-semibold text-gray-800">
        Cây danh mục (tối đa {maxLevel} cấp)
      </h2>
      <ul className="space-y-1 text-sm">
        {tree.map((node) => (
          <CategoryTreeItem
            key={node.id}
            node={node}
            level={1}
            maxLevel={maxLevel}
            onEdit={onEdit}
            onReorderDrop={handleDrop}
            onDragStart={handleDragStart}
            draggingId={draggingId}
            onAddSubcategoryInline={onAddSubcategoryInline}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListCategoriesPages;