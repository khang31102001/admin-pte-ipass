import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import { Course } from "@/types/courses";
import SearchBoxInput from "@/components/form/input/SearchBoxInput";
import ActionButtons from "@/components/common/ActionButtons";
import { courseService } from "@/services/course/courseService";


export default function UpdateCoursePage() {
    const { slug } = useParams<{ slug: string }>();
    const [courseData, setCourseData] = useState<Course>({
        course_id: undefined,
        title: "",
        slug: "",
        level: "BEGINNER",
        category: null,
        description: "",
        image: null,
        content: "",
        duration: "",
        startDate: "",
        endDate: "",
        metaTitle: "",
        metaDescription: "",
        audience: [],
        keywords: [],
        isFeatured: false,
        isDisabled: true,
        schemaEnabled: true,
        schemaMode: "auto",
        schemaData: "",
    });

    useEffect(() => {
        const fetchCourseDetail = async () => {
        //   setLoading(true);
          try {
            const detail = await courseService.getCourseDetail({ slug });
            setCourseData(detail);
            
          } finally {
            // setLoading(false);
          }
        };
    
        fetchCourseDetail();
      }, [slug]);

    const updateCourseData = (updates: Partial<Course>) => {
        setCourseData((prev) => ({ ...prev, ...updates }));
    };

    const RenderSearchBox = () => {
        return (
            <SearchBoxInput
                placeholder="Nhập mã / tên / slug khóa học..."
                onSearch={(value) => console.log("call api từ giá trị search value:", value)}
            />
        )
    }

    const handleUpdate = async () =>{
        try {
            await courseService.updateCourse(courseData.course_id!, courseData);
        } catch (error) {
            console.error("Failed to update course:", error);
        }
    }
    return (
        <>
            <PageMeta
                title="Cập nhật khóa học | Admin Dashboard"
                description="Chỉnh sửa thông tin khóa học, nội dung chi tiết, SEO và thời gian học rồi lưu thay đổi."
            />

            <PageBreadcrumb pageTitle="Cập nhật khóa học" />

            <div className="space-y-6">
                <ComponentCard
                    title="Thông tin khóa học"
                    desc="Chỉnh sửa thông tin, nội dung và cấu hình khóa học."
                    actionsSlot={
                        <ActionButtons
                            saveLabel= "Lưu thay đổi"
                            onSave={handleUpdate}
                        />
                    }
                    filtersSlot={RenderSearchBox()}
                >
                    <CoursesForm
                        courseData={courseData}
                        updateCourseData={updateCourseData}
                        categories={[]}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
