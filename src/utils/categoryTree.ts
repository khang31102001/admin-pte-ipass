
import type { CategoryItem } from "@/types/category";

export interface CategoryNode extends CategoryItem {
  children: CategoryNode[];
}

/**
 * Build tree từ mảng phẳng CategoryItem
 */
export function buildCategoryTree(items: CategoryItem[]): CategoryNode[] {
  const map = new Map<number, CategoryNode>();

  items.forEach((item) => {
    map.set(item.categoryId, {
      ...item,
      children: [],
    });
  });

  const roots: CategoryNode[] = [];

  map.forEach((node) => {
    if (node.parentId == null) {
      roots.push(node); // level 1
    } else {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        // nếu dữ liệu lỗi không có parent -> đẩy lên root
        roots.push(node);
      }
    }
  });

  return roots;
}

/**
 * Reorder mảng phẳng theo drag/drop
 * - Chỉ cho reorder trong cùng 1 parentId (cùng cấp)
 */
export function reorderFlatCategories(
  list: CategoryItem[],
  dragId: number,
  dropId: number
): CategoryItem[] {
  const dragIndex = list.findIndex((c) => c.categoryId === dragId);
  const dropIndex = list.findIndex((c) => c.categoryId === dropId);

  if (dragIndex === -1 || dropIndex === -1) return list;

  const dragItem = list[dragIndex];
  const dropItem = list[dropIndex];

  // khác parent -> không reorder để tránh vỡ cây
  if ((dragItem.parentId ?? null) !== (dropItem.parentId ?? null)) {
    return list;
  }

  const newList = [...list];
  // remove drag item
  newList.splice(dragIndex, 1);

  // tính lại dropIndex nếu dragIndex < dropIndex
  const realDropIndex =
    dragIndex < dropIndex ? dropIndex - 1 : dropIndex;

  // insert drag item vào vị trí mới
  newList.splice(realDropIndex, 0, dragItem);

  return newList;
}
