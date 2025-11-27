"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import Button from "@/components/ui/button/Button";
import PreviewSidebar from "@/components/courses/create/PreviewSidebar";
import BasicInformationTab from "@/components/courses/create/BasicInformationTab";
// import ContentTab from "@/components/courses/create/ContentTab";
import TimeAndTuitionTab from "@/components/courses/create/TimeAndTuitionTab";
import SeoAndSchemaTab from "@/components/courses/create/SeoAndSchemaTab";
import { Course, TabItem } from "@/types/courses";
import { ContentTab } from "@/components/courses";


 const tabsConfig: TabItem[] = [
  {
    label: "Thông tin cơ bản",
    value: "basic",
    content: BasicInformationTab,
  },
  {
    label: "Nội dung",
    value: "content",
    content: ContentTab,
  },
  {
    label: "Thời gian & Học Phí",
    value: "time-tuition",
    content: TimeAndTuitionTab,
  },
  {
    label: "SEO & Schema",
    value: "seo",
    content: SeoAndSchemaTab,
  },
];

export default function UpdateCoursePage() {
  const [activeTab, setActiveTab] = useState("basic");
  /// lấy param slug tren url call api or lấy course khóa học để chỉnh sửa
  // khởi tạo giá trị qua sate này
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    slug: "",
    level: "Beginner",
    category: null,
    category_id: null,
    description: "",
    isFeatured: false,
    image: null,
    content: "",
    duration: "",
    schedule: "",
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

  const updateCourseData = (updates: Partial<Course>) => {
    setCourseData((prev) => ({ ...prev, ...updates }));
    console.log("is course: ", courseData);
  };

  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
             Cập nhật khóa học
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Điều chỉnh đầy đủ thông tin khóa học PTE trước khi lưu
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary">Cancel</Button>
            <Button variant="outline">Save</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="col-span-2">
            <div className="bg-card border border-border rounded-lg">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="menu-item min-h-24">
                  {tabsConfig.map((items, index) => {
                    return (
                      <TabsTrigger
                        key={index}
                        value={items.value}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:menu-item-icon-active "
                      >
                        {items.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <div className="p-6">
                  {tabsConfig.map((tab) => {
                    const Component = tab.content;
                    return (
                      <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className="mt-0"
                      >
                        <Component
                          courseData={courseData}
                          updateCourseData={updateCourseData}
                        />
                      </TabsContent>
                    );
                  })}
                </div>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Preview & Settings */}
          <div className="col-span-1">
            <PreviewSidebar courseData={courseData} />
          </div>
        </div>
      </main>
    </div>
  );
}
