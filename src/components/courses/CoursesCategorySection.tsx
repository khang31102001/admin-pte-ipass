
import React, { useMemo, useState, useEffect } from "react";
import SearchSelect, { Option } from "../form/SearchSelect";
import Label from "../form/Label";
import { CategoryItem } from "@/types/category";



interface CoursesCategorySectionProps {
  categories: CategoryItem[];
  value?: number | null; 
  onChange: (categoryId: number | string) => void;
}

// Helper lấy id & parentId cho chắc (tùy backend đặt tên)
const getId = (cate: CategoryItem) =>
  (cate as any).categoryId ?? (cate as any).category_id;

const getParentId = (cate: CategoryItem) =>
  (cate as any).parentId ?? (cate as any).parent_id ?? null;

export const CoursesCategorySection: React.FC<CoursesCategorySectionProps> = ({
  categories,
  value,
  onChange,
}) => {
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedGrandChildId, setSelectedGrandChildId] = useState<number | null>(null);

  // Đồng bộ state khi edit (có value từ ngoài truyền vào)
  useEffect(() => {
    if (!value) {
      setSelectedParentId(null);
      setSelectedChildId(null);
      setSelectedGrandChildId(null);
      return;
    }

    const selected = categories.find((c) => getId(c) === value);
    if (!selected) return;

    const child = selected;
    const parent = categories.find((c) => getId(c) === getParentId(child));
    const grandParent =
      parent && getParentId(parent)
        ? categories.find((c) => getId(c) === getParentId(parent))
        : null;

    if (grandParent && parent) {
      // 3 cấp: grandParent -> parent -> child
      setSelectedParentId(getId(grandParent));
      setSelectedChildId(getId(parent));
      setSelectedGrandChildId(getId(child));
    } else if (parent) {
      // 2 cấp: parent -> child
      setSelectedParentId(getId(parent));
      setSelectedChildId(getId(child));
      setSelectedGrandChildId(null);
    } else {
      // 1 cấp: chỉ có chính nó
      setSelectedParentId(getId(child));
      setSelectedChildId(null);
      setSelectedGrandChildId(null);
    }
  }, [value, categories]);

  // Cấp 1: các category không có parent
  const parentCategories = useMemo(
    () => categories.filter((c) => !getParentId(c)),
    [categories]
  );

  // Cấp 2: con của parent
  const childCategories = useMemo(
    () =>
      selectedParentId
        ? categories.filter((c) => getParentId(c) === selectedParentId)
        : [],
    [categories, selectedParentId]
  );

  // Cấp 3: con của child
  const grandChildCategories = useMemo(
    () =>
      selectedChildId
        ? categories.filter((c) => getParentId(c) === selectedChildId)
        : [],
    [categories, selectedChildId]
  );

  const toOptions = (list: CategoryItem[]): Option[] =>
    list.map((cate) => ({
      label: cate.name,
      value: String(getId(cate)),
    }));

  const parentOptions = useMemo(() => toOptions(parentCategories), [parentCategories]);
  const childOptions = useMemo(() => toOptions(childCategories), [childCategories]);
  const grandChildOptions = useMemo(
    () => toOptions(grandChildCategories),
    [grandChildCategories]
  );

  const selectedParentOption =
    parentOptions.find((opt) => opt.value === String(selectedParentId)) ?? null;

  const selectedChildOption =
    childOptions.find((opt) => opt.value === String(selectedChildId)) ?? null;

  const selectedGrandChildOption =
    grandChildOptions.find((opt) => opt.value === String(selectedGrandChildId)) ??
    null;

  // Khi chọn parent
  const handleChangeParent = (valueStr: string) => {
    const id = Number(valueStr) || null;
    setSelectedParentId(id);
    setSelectedChildId(null);
    setSelectedGrandChildId(null);

    const hasChildren = categories.some((c) => getParentId(c) === id);
    // Nếu không có con -> chọn luôn parent
    onChange(hasChildren ?  null: id );
  };

  // Khi chọn child
  const handleChangeChild = (valueStr: string) => {
    const id = Number(valueStr) || null;
    setSelectedChildId(id);
    setSelectedGrandChildId(null);

    const hasGrandChildren = categories.some((c) => getParentId(c) === id);
    // Nếu không có cháu -> chọn child làm category cuối
    onChange(hasGrandChildren ? null : id);
  };

  // Khi chọn grand child
  const handleChangeGrandChild = (valueStr: string) => {
    const id = Number(valueStr) || null;
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
          Hiện chưa có danh mục khóa hoc. Vui lòng tạo danh mục trước.
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
                options={parentOptions}
                value={selectedParentOption}
                onChange={(opt) => handleChangeParent(opt.value)}
                placeholder="Chọn danh mục chính..."
              />
            </div>
          </div>

          {/* Child */}
          {childOptions.length > 0 && (
            <div>
              <Label htmlFor="category-child" className="text-sm font-medium">
                Danh mục cấp 2
              </Label>
              <div className="w-full mt-2">
                <SearchSelect
                  options={childOptions}
                  value={selectedChildOption}
                  onChange={(opt) => handleChangeChild(opt.value)}
                  placeholder="Chọn danh mục con..."
                />
              </div>
            </div>
          )}

          {/* Grand child */}
          {grandChildOptions.length > 0 && (
            <div>
              <Label htmlFor="category-grandchild" className="text-sm font-medium">
                Danh mục cấp 3
              </Label>
              <div className="w-full mt-2">
                <SearchSelect
                  options={grandChildOptions}
                  value={selectedGrandChildOption}
                  onChange={(opt) => handleChangeGrandChild(opt.value)}
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
