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


export const tabsConfig: TabItem[] = [
  {
    label: "Thông tin cơ bản",
    value: "basic",
    content: BasicInformationTab,
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

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    slug: "",
    level: "Beginner",
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
    keywords: [],
    schemaEnabled: true,
    schemaMode: "auto",
    schemaData: "",
  });

  const updateCourseData = (updates: Partial<Course>) => {
    setCourseData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create new course
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in all PTE course information before publishing
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary">Cancel</Button>
            <Button variant="outline">Save draft</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save & publish
            </Button>
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
