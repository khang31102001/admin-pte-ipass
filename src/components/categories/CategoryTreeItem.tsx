import React, { useState } from "react";
import { CategoryItem } from "@/types/category";
import { generateSlug } from "@/lib/helper";
import { useConfirmDelete } from "@/hooks/common/useConfirmDelete";

const initialCateForm: CategoryItem = {
  categoryId: undefined,
  name: "",
  slug: "",
  parentId: null,
  categoryType: "",
  level: undefined,
};

interface CategoryTreeItemProps {
  node: CategoryItem;
  level: number;
  maxLevel: number;
  draggingId: number | null;
  onDragStart: (id: number) => void;
  onReorderDrop: (id: number) => void;
  onEdit: (id: string) => void;
  onAddSubcategoryInline: (values: Partial<CategoryItem>) => void;
  onDelete?: (categoryId: number) => void;
}

const levelIndentClass: Record<number, string> = {
  1: "pl-0",
  2: "pl-4",
  3: "pl-8",
};

const CategoryTreeItem: React.FC<CategoryTreeItemProps> = ({
  node,
  level,
  maxLevel,
  draggingId,
  onDragStart,
  onReorderDrop,
  onEdit,
  onAddSubcategoryInline,
  onDelete,
}) => {
  const [showAddChild, setShowAddChild] = useState(false);
  const [cateForm, setCateForm] = useState<CategoryItem>(initialCateForm);

  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  // console.log("ccheck hasChildren", hasChildren);
  const indentClass = levelIndentClass[level] ?? "pl-0";
  const {confirmDelete} =  useConfirmDelete();



  const handleChangeCate = (updates: Partial<CategoryItem>) => {
    setCateForm((prev) => ({
      ...prev,
      ...updates,
    }));
  }

  const handleNameChange = (value: string) => {
    setCateForm((prev) => ({
      ...prev,
      name: value,
      parentId: node.categoryId,
      level: level + 1,
      slug: generateSlug(value),
    }));
  };

  // console.log("check slug generate:",cateForm )
  const handleAddChild = () => {
    onAddSubcategoryInline(cateForm);
    setCateForm(initialCateForm);
    setShowAddChild(false);
  };



  const isDragging = draggingId === node.categoryId;
  const handleRowClick = () => {
    if (hasChildren) {
      setIsExpanded((prev) => !prev);
    }
  }

  //  console.log("node.categoryId", node.categoryId);
  return (
    <>
      <li
        onClick={handleRowClick}
        draggable
        onDragStart={() => onDragStart(node.categoryId)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onReorderDrop(node.categoryId)}
        className={`flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-gray-50 ${indentClass} ${isDragging ? "opacity-50" : ""
          }`}
      >
        <div className="flex items-center gap-2">
          {/* Drag handle icon đơn giản */}
          <span className="cursor-grab text-gray-300">⋮⋮</span>
          <span
            className={`h-1.5 w-1.5 rounded-full ${level === 1
              ? "bg-indigo-600"
              : level === 2
                ? "bg-emerald-500"
                : "bg-amber-500"
              }`}
          />

          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {node.name}
            </span>
            {node.slug && (
              <span className="text-[11px] text-gray-400">
                slug: {node.slug}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {level !== 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                confirmDelete(
                  async () => {
                    await onDelete?.(node.categoryId);
                  },
                  {
                    title: "Xóa danh mục?",
                    text: `Danh mục "${node.name}" sẽ bị xóa vĩnh viễn!`,
                  }
                );
              }}
              className="rounded border bg-red-400 border-gray-200 px-2 py-1 text-red-900 hover:bg-red-600 hover:text-white"
            >
              Delete
            </button>
          )}

          {level !== 1 && (
            <button
              type="button"
              onClick={() => onEdit(node.slug)}
              className="rounded border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-100"
            >
              Sửa
            </button>
          )}

          {/* Thêm subcategory inline nếu chưa vượt maxLevel */}
          {level < maxLevel && (
            <button
              type="button"
              onClick={() => setShowAddChild((v) => !v)}
              className="rounded border border-indigo-200 bg-indigo-50 px-2 py-1 text-indigo-600 hover:bg-indigo-100"
            >
              + Con
            </button>
          )}
        </div>
      </li>

      {/* Form add child inline */}
      {showAddChild && level < maxLevel && (
        <li className={`${indentClass} pl-8`}>
          <div className="mb-2 mt-1 flex items-center gap-2">
            <input
              type="text"
              value={cateForm.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Tên danh mục con (Khóa học)"
            />
            <input
              type="text"
              value={cateForm.categoryType}
              onChange={(e) => handleChangeCate({ categoryType: e.target.value })}
              className="w-64 rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Loại danh mục con (BASIS)"
            />
            <button
              type="button"
              onClick={handleAddChild}
              className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddChild(false);
                handleChangeCate({ name: "", categoryType: "" });
              }}
              className="rounded border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
          </div>
        </li>
      )}

      {/* render con */}
      {hasChildren &&
        <ul className={`transition-all duration-300 overflow-hidden
             ${isExpanded ? "max-h-[1000px] opacity-100 translate-y-0" : " max-h-0 opacity-0 -translate-y-4"}
        `}>
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.categoryId}
              node={child}
              level={Math.min(level + 1, maxLevel)}
              maxLevel={maxLevel}
              draggingId={draggingId}
              onDragStart={onDragStart}
              onReorderDrop={onReorderDrop}
              onEdit={onEdit}
              onAddSubcategoryInline={onAddSubcategoryInline}
              onDelete={onDelete}
            />
          ))

          }
        </ul>

      }
    </>
  );
};

export default CategoryTreeItem;
