import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import DetailCourse from "@/components/courses/detail/CourseDetail";
import { CourseDetail } from "@/types/courses";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseService } from "@/services/course/courseService";


interface DetailActionButtonsProps {
  onBack: () => void;
  onEdit: () => void;
}

const DetailActionButtons: React.FC<DetailActionButtonsProps> = ({ onBack, onEdit }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onBack}
        className="px-3 py-2 text-sm rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition"
      >
        Hủy / Quay lại
      </button>

      <button
        onClick={onEdit}
        className="px-4 py-2 text-sm font-semibold rounded-full text-[#04016C] shadow-sm"
        style={{ background: "color-mix(in oklab, #F6E10E 90%, transparent 10%)" }}
      >
        Chỉnh sửa
      </button>
    </div>
  );
};

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
          <DetailActionButtons
            onBack={handleBack}
            onEdit={handleEdit}
          />}
        >
          <DetailCourse data={data} />
        </ComponentCard>
      </div>
    </>
  );
};

export default CourseDetailPage;
