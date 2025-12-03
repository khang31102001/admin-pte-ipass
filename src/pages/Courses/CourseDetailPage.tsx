import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import DetailCourse from "@/components/courses/detail/CourseDetail";
import { CourseDetail } from "@/types/courses";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseService } from "@/services/course/courseService";
import ActionButtons from "@/components/common/ActionButtons";





const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCourseDetail = async () => {
      setLoading(true);
      try {
        const detail = await courseService.getCourseDetail({ slug });
        setData(detail);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [slug]);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/courses");
  };

  const handleEdit = () => {
    navigate(`/courses/update/${slug}`);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center text-sm text-gray-500">
        Loading course...
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`Chi tiết khóa học: ${data.title} | Admin Dashboard`}
        description="Xem chi tiết thông tin, nội dung, lịch học và cài đặt của khóa học trong hệ thống quản lý."
      />
      <PageBreadcrumb pageTitle="Chi tiết khóa học" />

      <div className="space-y-6">
        <ComponentCard
          title={data.title}
          desc="Xem đầy đủ thông tin khóa học, nội dung chi tiết, lịch học, học phí và các thiết lập liên quan."
          actionsSlot={
            <ActionButtons
              updateLabel="Chỉnh sửa"
              onUpdate={handleEdit}
             cancelLabel="Hủy / Quay lại"
              onCancel={handleBack}
            />
          }
        >
          <DetailCourse data={data} />
        </ComponentCard>
      </div>
    </>
  );
};

export default CourseDetailPage;
