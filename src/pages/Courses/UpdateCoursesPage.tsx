import { useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import { Course } from "@/types/courses";
import SearchBoxInput from "@/components/form/input/SearchBoxInput";
import ActionButtons from "@/components/common/ActionButtons";

export default function UpdateCoursePage() {
    // TODO: sau này bạn fetch course theo slug/id ở đây rồi setCourseData
    // const { slug } = useParams<{ slug?: string }>(); // slug lấy từ /:slug
    const [courseData, setCourseData] = useState<Course>({
        title: "",
        slug: "",
        level: "Beginner",
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
        is_featured: false,
        is_disbale: true,
        schemaEnabled: true,
        schemaMode: "auto",
        schemaData: "",
    });

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

    const handleSave = ()=>{

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
                            onSave={handleSave}
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
