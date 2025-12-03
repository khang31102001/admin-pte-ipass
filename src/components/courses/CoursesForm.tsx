
import { useState } from "react";
import PreviewSidebar from "@/components/courses/PreviewSidebar";
import BasicInformationTab from "@/components/courses/BasicInformationTab";
// import ContentTab from "@/components/courses/create/ContentTab";
import TimeAndTuitionTab from "@/components/courses/TimeAndTuitionTab";
import SeoAndSchemaTab from "@/components/courses/SeoAndSchemaTab";
import { Course } from "@/types/courses";
import { ContentTab } from "@/components/courses";
import Tabs from "../common/Tabs";
import { CategoryItem } from "@/types/category";
import { CourseValidationErrors } from "../validators/courseValidation";
import FormErrorSummary from "../common/FormErrorSummary";

export type TabValue = "basic" | "content" | "time-tuition" | "seo";
export type TabItem = {
  id: number;
  label: string;
  value: TabValue;
  content: React.ComponentType<{
    courseData: Course;
    updateCourseData: (updates: Partial<Course>) => void;
    categories?: CategoryItem[] | [];
  }>;
};

const tabsConfig: TabItem[] = [
  {
    id: 1,
    label: "Thông tin cơ bản",
    value: "basic",
    content: BasicInformationTab,
  },
  {
    id: 2,
    label: "Nội dung",
    value: "content",
    content: ContentTab,
  },
  {
    id: 3,
    label: "Thời gian & Học Phí",
    value: "time-tuition",
    content: TimeAndTuitionTab,
  },
  {
    id: 4,
    label: "SEO & Schema",
    value: "seo",
    content: SeoAndSchemaTab,
  },
];
interface CoursesFormProps{
  categories: CategoryItem[];
  courseData: Course 
  updateCourseData?: (updates: Partial<Course>) => void;
   errors?: CourseValidationErrors;

}
export default function CoursesForm({
  categories = [],
  courseData,
  updateCourseData,
  errors
}: CoursesFormProps) {
  const [activeTab, setActiveTab] = useState<number>(tabsConfig[0].id ?? 1);
  
  const activeTabConfig = tabsConfig.find((tab) => tab.id === activeTab) ?? tabsConfig[0];
  const ActiveTabComponent = activeTabConfig.content;

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-0">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">

          {/* Left Column - Form */}      
            <div className="bg-card border border-border rounded-lg">
              <FormErrorSummary errors={errors} />
              <Tabs
                items={[...tabsConfig]}
                defaultActiveId={activeTab}
                onChange={setActiveTab}
                className="w-full min-h-20"
              >
               <div className="px-4 py-2">
                <ActiveTabComponent
                  courseData={courseData}
                  updateCourseData={updateCourseData}
                  categories={[]}
                />
               </div>
              </Tabs>
            </div>
         

          {/* Right Column - Preview & Settings */}
          <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
            <PreviewSidebar 
              courseData={courseData} 
              updateCourseData={updateCourseData} 
              categories={categories}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
