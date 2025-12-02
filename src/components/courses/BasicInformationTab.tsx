import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Label from "@/components/form/Label"
import SearchSelect from "@/components/form/SearchSelect"
import { generateSlug, getBaseUrl } from "@/lib/helper"
import { CategoryItem } from "@/types/category"
import { Course } from "@/types/courses"
import React, {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
} from "react"
import Select from "../form/Select"

interface BasicInformationTabProps {
  categories?: CategoryItem[];
  courseData: Course;
  updateCourseData: (updates: Partial<Course>) => void;
}

export const LEVEL = [
  { value: "BEGINNER", label: "PTE Basic" },
  { value: "ADVANCED", label: "PTE Advanced" },
  { value: "INTERMEDIATE", label: "Intermediate" },
];

interface Option {
  value: string;
  label: string;
}

export default function BasicInformationTab({
  categories = [],
  courseData,
  updateCourseData,
}: BasicInformationTabProps) {
  const [charCount, setCharCount] = useState(
    courseData.description?.length ?? 0
  );
  const [selectedParentSlug, setSelectedParentSlug] = useState<string | null>(
    null
  );

  const BASE_URL = getBaseUrl();

  useEffect(() => {
    setCharCount(courseData.description?.length ?? 0);
  }, [courseData.description]);

  // Lấy category cha (level 1 / parent_id null)
  const parentCategories = useMemo(() => {
    return categories.filter(
      (cate) => !cate.parent_id || cate.level === 1
    );
  }, [categories]);

  //  Tìm parent từ slug
  const findParentBySlug = (slug: string | null) => {
    if (!slug) return null;
    return parentCategories.find((cate) => cate.slug === slug) ?? null;
  };

  //  Khi load form (edit course), tự set parent theo category hiện tại (nếu có)
  useEffect(() => {
    if (courseData.category && courseData.category.parent_id) {
      const parent = categories.find(
        (c) => c.category_id === courseData.category!.parent_id
      );
      if (parent?.slug) {
        setSelectedParentSlug(parent.slug);
      }
    }
  }, [courseData.category, categories]);

  const parentOptions: Option[] = useMemo(() => {
    return parentCategories.map((cate) => ({
      label: cate.name,
      value: cate.slug ?? String(cate.category_id),
    }));
  }, [parentCategories]);

  const selectedParentOption: Option | null = useMemo(() => {
    if (!selectedParentSlug) return null;
    return (
      parentOptions.find((opt) => opt.value === selectedParentSlug) ??
      null
    );
  }, [selectedParentSlug, parentOptions]);

  //  children của parent đã chọn
  const childCategories: CategoryItem[] = useMemo(() => {
    const parent = findParentBySlug(selectedParentSlug);
    return parent?.children ?? [];
  }, [selectedParentSlug, categories]);

  const childOptions: Option[] = useMemo(() => {
    return childCategories.map((child) => ({
      label: child.name,
      value: child.slug ?? String(child.category_id),
    }));
  }, [childCategories]);

  const selectedChildOption: Option | null = useMemo(() => {
    if (!courseData.category?.slug) return null;
    return (
      childOptions.find(
        (opt) => opt.value === courseData.category!.slug
      ) ?? null
    );
  }, [courseData.category?.slug, childOptions]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value ?? "";
    const slug = generateSlug(title);
    updateCourseData({ title, slug });
  };

  // 👉 Chọn category cha
  const handleChangeParent = (slugOrId: string) => {
    setSelectedParentSlug(slugOrId);

    // Reset category con khi đổi cha
    updateCourseData({
      categoryId: undefined,
      category: undefined,
    });
  };

  // 👉 Chọn category con
  const handleChangeChild = (slugOrId: string) => {
    // Tìm trong children của parent hiện tại
    const parent = findParentBySlug(selectedParentSlug);
    const child =
      parent?.children?.find(
        (c) => c.slug === slugOrId || String(c.category_id) === slugOrId
      ) ?? null;

    if (!child) return;

    updateCourseData({
      categoryId: child.category_id,
      category: child,
    });
  };

  return (
    <div className="space-y-6">
      {/* Course Title */}
      <div>
        <Label htmlFor="title" className="text-sm font-medium">
          Tên khóa học *
        </Label>
        <Input
          id="title"
          placeholder="PTE Foundation – Platform from 0 to 50+"
          value={courseData.title ?? ""}
          onChange={handleChangeTitle}
          className="mt-2"
        />
      </div>

      {/* Slug */}
      <div>
        <Label htmlFor="slug" className="text-sm font-medium">
          Slug
        </Label>
        <div className="mt-2">
          <Input
            id="slug"
            value={courseData.slug ?? ""}
            onChange={(e) => updateCourseData({ slug: e.target.value })}
            disabled={true}
            placeholder="tự động tạo từ tiêu đề....."
          />
        </div>
        {courseData.slug && (
          <p className="mt-2 text-xs text-brand-600 dark:text-white">
            {BASE_URL}
            {courseData.slug}
          </p>
        )}
      </div>

      {/* Category cha + con */}
      {categories.length > 0 && (
        <div className="space-y-4">
          {/* Parent category */}
          <div>
            <Label htmlFor="category-parent" className="text-sm font-medium">
              Category (Parent) *
            </Label>
            <div className="w-full mt-2">
              <SearchSelect
                options={parentOptions}
                value={selectedParentOption}
                onChange={(newValue) => handleChangeParent(newValue.value)}
                placeholder="Chọn danh mục cha..."
              />
            </div>
          </div>

          {/* Child category (chỉ hiện nếu có children) */}
          {childOptions.length > 0 && (
            <div>
              <Label htmlFor="category-child" className="text-sm font-medium">
                Category (Child) *
              </Label>
              <div className="w-full mt-2">
                <SearchSelect
                  options={childOptions}
                  value={selectedChildOption}
                  onChange={(newValue) => handleChangeChild(newValue.value)}
                  placeholder="Chọn danh mục con..."
                />
              </div>

              <p className="mt-3 text-sm text-gray-600">
                Selected: {courseData.category?.name ?? "Chưa chọn"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Level */}
      <div>
        <Label htmlFor="level" className="text-sm font-medium">
          Level
        </Label>
        <div className="max-w-md">
          <Select
            options={LEVEL}
            defaultValue={courseData.level}
            onChange={(newValue) => updateCourseData({ level: newValue })}
            placeholder="Search course level..."
          />

          <p className="mt-3 text-sm text-gray-600">
            Selected: {courseData.level ?? " Chưa chọn"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium">
          Mô tả ngắn
        </Label>
        <TextArea
          placeholder="Mô tả ngắn gọn về khóa học..."
          value={courseData.description ?? ""}
          rows={3}
          className="mt-2"
          onChange={(value) =>
            updateCourseData({ description: value })
          }
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {charCount}/250
        </p>
      </div>
    </div>
  );
}
