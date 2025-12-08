import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Label from "@/components/form/Label"
import { generateSlug, getBaseUrl } from "@/lib/helper"
import { CategoryItem } from "@/types/category"
import { Course } from "@/types/courses"
import React, {
  useState,
  useEffect,
  ChangeEvent,

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



export default function BasicInformationTab({
  courseData,
  updateCourseData,
}: BasicInformationTabProps) {
  const [charCount, setCharCount] = useState(
    courseData.description?.length ?? 0
  );


  const BASE_URL = getBaseUrl();

  useEffect(() => {
    setCharCount(courseData.description?.length ?? 0);
  }, [courseData.description]);



  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value ?? "";
    const slug = generateSlug(title);
    updateCourseData({ title, slug });
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
