import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Label from "@/components/form/Label"
import { getBaseUrl } from "@/lib/helper"
import { CategoryItem } from "@/types/category"
import { Course } from "@/types/courses"
import{
  useState,
  useEffect,

} from "react"
import Select from "../form/Select"
import Button from "../ui/button/Button"
import { X } from "lucide-react"

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
  const [newAudience, setNewAudience] = useState("");

  const BASE_URL = getBaseUrl();

  useEffect(() => {
    setCharCount(courseData.description?.length ?? 0);
  }, [courseData.description]);



 

    const addAudience = () => {
    if (newAudience.trim()) {
      updateCourseData({
        audience: [...courseData.audience, newAudience.trim()],
      })
      setNewAudience("")
    }
  }

    const removeAudience = (index: number) => {
    updateCourseData({
      audience: courseData.audience.filter((_, i) => i !== index),
    })
  }



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
          onChange={(e)=> updateCourseData({title: e.target.value})}
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

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium">
          Mô tả ngắn
        </Label>
        <TextArea
          placeholder="Mô tả ngắn gọn về khóa học..."
          value={courseData.description ?? ""}
          rows={4}
          className="mt-2"
          onChange={(value) =>
            updateCourseData({ description: value })
          }
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {charCount}/250
        </p>
      </div>

      
      {/* Level */}
      <div className="space-y-2">
        <Label htmlFor="level" className="text-sm font-medium">
          Level
        </Label>
        <div className="w-full mt-2">
          <Select
            options={LEVEL}
            defaultValue={courseData.level}
            onChange={(newValue) => updateCourseData({ level: newValue })}
            placeholder="Select course level..."
          />

          <p className="mt-3 text-sm text-gray-800">
            Selected: {courseData.level ?? " Chưa chọn"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="audience" className="text-sm font-medium">
          Đối tượng phù hợp (Tùy chọn)
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="audience"
            placeholder="e.g., Beginners, PTE 50+ target"
            value={newAudience}
            onChange={(e) => setNewAudience(e.target.value)}
          />
          <Button onClick={addAudience} size="sm" variant="outline">
            Thêm
          </Button>
        </div>

           {courseData.audience?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {courseData.audience.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#04016C]/5 text-[#04016C] text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeAudience(index)}
                    className="text-[10px] hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}

      </div>
    </div>
  );
}
