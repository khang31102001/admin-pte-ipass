import React, { useMemo, useState, useEffect } from "react";
import SearchSelect, { Option } from "../form/SearchSelect";
import Label from "../form/Label";
import { CategoryItem } from "@/types/category";

interface CoursesCategorySectionProps {
  categories: CategoryItem[];
  value?: number | null;
  onChange: (categoryId: number | string | null) => void;
}
const parseId = (v: string) => (v === "" ? null : Number(v));
// Helper lấy id & parentId cho chắc (tùy backend đặt tên)
const getId = (cate: CategoryItem) =>
  (cate as any).categoryId ?? (cate as any).id;

const getParentId = (cate: CategoryItem) =>
  (cate as any).parentId ?? (cate as any).parent_id ?? null;

// Đệ quy tìm category trong tree theo id
const findCategoryById = (
  items: CategoryItem[],
  id: number
): CategoryItem | null => {
  for (const item of items) {
    if (getId(item) === id) return item;

    if (item.children?.length) {
      const found = findCategoryById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const CoursesCategorySection: React.FC<CoursesCategorySectionProps> = ({
  categories,
  value,
  onChange,
}) => {
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedGrandChildId, setSelectedGrandChildId] =
    useState<number | null>(null);

 useEffect(() => {
  // Không reset state khi value = null, chỉ sync khi có id
  if (value == null) return;

  const selectedId = Number(value);
  const selected = findCategoryById(categories, selectedId);
  if (!selected) return;

  const parentId = getParentId(selected);
  const parent = parentId ? findCategoryById(categories, parentId) : null;

  const grandParentId = parent ? getParentId(parent) : null;
  const grandParent = grandParentId
    ? findCategoryById(categories, grandParentId)
    : null;

  if (grandParent && parent) {
    setSelectedParentId(getId(grandParent));
    setSelectedChildId(getId(parent));
    setSelectedGrandChildId(getId(selected));
  } else if (parent) {
    setSelectedParentId(getId(parent));
    setSelectedChildId(getId(selected));
    setSelectedGrandChildId(null);
  } else {
    setSelectedParentId(getId(selected));
    setSelectedChildId(null);
    setSelectedGrandChildId(null);
  }
}, [value, categories]);



  // Cấp 2: children của parent đã chọn
  const childCategories = useMemo(() => {
    if (!selectedParentId) return [];
    const parent = findCategoryById(categories, selectedParentId);
    return parent?.children ?? [];
  }, [categories, selectedParentId]);

  // Cấp 3: children của child đã chọn
  const grandChildCategories = useMemo(() => {
    if (!selectedChildId) return [];
    const child = findCategoryById(categories, selectedChildId);
    return child?.children ?? [];
  }, [categories, selectedChildId]);

  const toOptions = (list: CategoryItem[]): Option[] =>
  [
    {
      label: "-- Select category --",
      value: ""

    },
    ...list.map((cate) => ({
      label: cate.name,
      value: String(getId(cate)),
    })),
  ]


  // Cấp 1: root categories (mảng categories bạn truyền vào đã là root)
  const parentOptions = useMemo(() => toOptions(categories), [categories]);
  
  const childOptions = useMemo(
    () => toOptions(childCategories),
    [childCategories]
  );
  const grandChildOptions = useMemo(
    () => toOptions(grandChildCategories),
    [grandChildCategories]
  );

  const selectedParentOption =
    parentOptions.find((opt) => opt.value === String(selectedParentId)) ?? null;

  const selectedChildOption =
    childOptions.find((opt) => opt.value === String(selectedChildId)) ?? null;

  const selectedGrandChildOption =
    grandChildOptions.find((opt) => opt.value === String(selectedGrandChildId)) ?? null;

  // Khi chọn parent (cấp 1)
  const handleChangeParent = (valueStr: string) => {
    const id = parseId(valueStr);
    setSelectedParentId(id);
    setSelectedChildId(null);
    setSelectedGrandChildId(null);

    if (id === null) {
      onChange(null);
      return;
    }

    // const parent = findCategoryById(categories, id);
    // const hasChildren = !!parent?.children?.length;

    // Nếu không có con -> chọn luôn parent là category cuối
    onChange(id);
  };

  // Khi chọn child (cấp 2)
  const handleChangeChild = (valueStr: string) => {
    const id = parseId(valueStr);
    setSelectedChildId(id);
    setSelectedGrandChildId(null);

    if (id === null) {
      onChange(selectedParentId);
      return;
    }

    // const child = findCategoryById(categories, id);
    // const hasChildren = !!child?.children?.length;

    // Nếu không có cháu -> chọn child làm category cuối
    onChange(id);
  };

  useEffect(() => {
  console.log("prop value(categoryId):", value);
  console.log("selectedParentId:", selectedParentId);
  console.log("selectedChildId:", selectedChildId);
  console.log("selectedGrandChildId:", selectedGrandChildId);
}, [value, selectedParentId, selectedChildId, selectedGrandChildId]);

  // Khi chọn grand child (cấp 3)
  const handleChangeGrandChild = (valueStr: string) => {
    const id = parseId(valueStr);
    setSelectedGrandChildId(id);
    onChange(id);
  };

  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
      <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
        Danh mục tin tức
      </h3>

      {categories.length === 0 ? (
        <p className="text-xs text-gray-500">
          Hiện chưa có danh mục. Vui lòng tạo danh mục trước.
        </p>
      ) : (
        <div className="space-y-4">
          {/* Parent */}
          <div>
            <Label htmlFor="category-parent" className="text-sm font-medium">
              Danh mục cấp 1 *
            </Label>
            <div className="w-full mt-2">
              <SearchSelect
              key={`parentOptions`}
                options={parentOptions}
                value={selectedParentOption}
                onChange={(opt) => handleChangeParent(opt?.value ?? "")}
                placeholder="Chọn danh mục chính..."
              />
            </div>
          </div>

          {/* Child */}
          {childOptions.length > 0 && selectedParentOption && (
            <div>
              <Label htmlFor="category-child" className="text-sm font-medium">
                Danh mục cấp 2
              </Label>
              <div className="w-full mt-2">
                <SearchSelect
                  key={`childOptions${selectedParentId}`}
                  options={childOptions}
                  value={selectedChildOption}
                  onChange={(opt) => handleChangeChild(opt?.value ?? "")}
                  placeholder="Chọn danh mục con..."
                />
              </div>
            </div>
          )}

          {/* Grand child */}
          {grandChildOptions.length > 0 && selectedChildOption  && (
            <div>
              <Label
                htmlFor="category-grandchild"
                className="text-sm font-medium"
              >
                Danh mục cấp 3
              </Label>
              <div className="w-full mt-2">
                <SearchSelect
                  key={`grand-${selectedChildId}`} 
                  options={grandChildOptions}
                  value={selectedGrandChildOption}
                  onChange={(opt) => handleChangeGrandChild(opt?.value ?? "")}
                  placeholder="Chọn danh mục chi tiết..."
                />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
