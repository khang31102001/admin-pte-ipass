"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs"
import Button from "@/components/ui/button/Button"
import PreviewSidebar from "@/components/courses/create/PreviewSidebar"
import BasicInformationTab from "@/components/courses/create/BasicInformationTab"
import ContentTab from "@/components/courses/create/ContentTab"
import TimeAndTuitionTab from "@/components/courses/create/TimeAndTuitionTab"
import SeoAndSchemaTab from "@/components/courses/create/SeoAndSchemaTab"

interface CourseData {
  title: string
  slug: string
  category: string
  level: string
  description: string
  featured: boolean
  image: string | null
  content: string
  benefits: string
  audience: string[]
  duration: string
  schedule: string
  tuition: number
  startDate: string
  endDate: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  schemaEnabled: boolean
  schemaMode: "auto" | "custom"
  schemaData: string
}

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    slug: "",
    category: "",
    level: "Beginner",
    description: "",
    featured: false,
    image: null,
    content: "",
    benefits: "",
    audience: [],
    duration: "",
    schedule: "",
    tuition: 0,
    startDate: "",
    endDate: "",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    schemaEnabled: true,
    schemaMode: "auto",
    schemaData: "",
  })

  const updateCourseData = (updates: Partial<CourseData>) => {
    setCourseData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new course</h1>
            <p className="mt-2 text-sm text-muted-foreground">Fill in all PTE course information before publishing</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary">Cancel</Button>
            <Button variant="outline">Save draft</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save & publish</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="col-span-2">
            <div className="bg-card border border-border rounded-lg">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
                  <TabsTrigger
                    value="basic"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Basic information
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Detailed content
                  </TabsTrigger>
                  <TabsTrigger
                    value="time-tuition"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Time & Tuition
                  </TabsTrigger>
                  <TabsTrigger
                    value="seo"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    SEO & Schema
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="basic" className="mt-0">
                    <BasicInformationTab courseData={courseData} updateCourseData={updateCourseData} />
                  </TabsContent>
                  <TabsContent value="content" className="mt-0">
                    <ContentTab courseData={courseData} updateCourseData={updateCourseData} />
                  </TabsContent>
                  <TabsContent value="time-tuition" className="mt-0">
                    <TimeAndTuitionTab courseData={courseData} updateCourseData={updateCourseData} />
                  </TabsContent>
                  <TabsContent value="seo" className="mt-0">
                    <SeoAndSchemaTab courseData={courseData} updateCourseData={updateCourseData} />
                  </TabsContent>
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
  )
}
