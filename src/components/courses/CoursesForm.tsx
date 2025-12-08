
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
import { CourseValidationErrors, isCourseValid, validateCourse } from "../../validators/courseValidation";
import FormErrorSummary from "../common/FormErrorSummary";
import { IMedia } from "@/types/media";
import { toast } from "react-toastify";

  type Mode = "create" | "update";
 type TabValue = "basic" | "content" | "time-tuition" | "seo";
 type TabItem = {
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
interface CoursesFormProps {
  mode: Mode;
  categories: CategoryItem[] ;
  initCourseData?: Course | null;
  onSubmit?: (form: FormData, courseId?: number) => void;
}
export default function CoursesForm({
  mode = "create",
  categories = [],
  initCourseData = null,
  onSubmit,
}: CoursesFormProps) {

  const [courseData, setCourseData] = useState<Course>({
    ...initCourseData,
    title: "",
    slug: "",
    level: "BEGINER",
    category: null,
    categoryId: null,
    description: "",
    isDisabled: false,
    isFeatured: false,
    image: null,
    content: "",
    duration: "",
    startDate: "",
    endDate: "",
    metaTitle: "",
    metaDescription: "",
    audience: [],
    keywords: [],
    schemaEnabled: true,
    schemaMode: "auto",
    schemaData: "",

  });

  const [imgPreview, setImgPreview] = useState<IMedia | null>({
    file: null,
    preview: initCourseData?.image ?? "",
    isImageChanged: false,
    deleteImageUrl: initCourseData?.image ?? undefined,
  });

  const [errors, setErrors] = useState<CourseValidationErrors>({});

  const [activeTab, setActiveTab] = useState<number>(tabsConfig[0].id ?? 1);
  const activeTabConfig = tabsConfig.find((tab) => tab.id === activeTab) ?? tabsConfig[0];
  const ActiveTabComponent = activeTabConfig.content;
  const isEdit = mode === "update";

  
  const hanndleMediaChange = (media: Partial<IMedia | null>) => {
    if(isEdit){
      setImgPreview((prev) => ({ 
         ...prev, 
        ...media, 
        deleteImageUrl: initCourseData?.image ,
        isImageChanged: true,
    }));
    }else{
        setImgPreview((prev) => ({ 
          ...prev, 
          ...media, 
          deleteImageUrl: undefined ,
          isImageChanged: false,
      }));
    }
      
    setCourseData((prev) => ({
      ...prev,
      image: media.preview ?? "",
    }));
  }
  const handleChangeCourseData = (updates: Partial<Course>) => {
    setCourseData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatError = validateCourse(courseData);
    setErrors(validatError);

    // console.log("check audit courseData:", courseData);
    if (!isCourseValid(validatError)) {
      // Có lỗi -> không cho save, có thể scroll lên đầu hoặc show toast
      toast.error("Vui lòng kiểm tra lại thông tin khóa học");
      return;
    }

    // Handle form submission logic here
    const formData = new FormData();
    if (imgPreview?.file) {
      formData.append("file", imgPreview.file);
    }

    if (courseData) {
      const request = { ...courseData }; 
      delete request.courseId; 
      delete request.image;
      formData.append("request", request ? JSON.stringify(request) : "");
    }

     if (onSubmit) {
      onSubmit(formData, isEdit ? initCourseData?.courseId : undefined);
    }
    
  }

    
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-0">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">

          {/* Left Column - Form */}
          <form id="courses-form" onSubmit={handleSubmit} className="bg-card border border-border rounded-lg">
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
                  updateCourseData={handleChangeCourseData}
                  categories={[]}
                />
              </div>
            </Tabs>
          </form>


          {/* Right Column - Preview & Settings */}
          <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
            <PreviewSidebar
              courseData={courseData}
              onChangeMedia={hanndleMediaChange}
              updateCourseData={handleChangeCourseData}
              categories={categories}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
