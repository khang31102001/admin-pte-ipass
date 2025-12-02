import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import DetailCourse from "@/components/courses/detail/CourseDetail";
import { CourseDetail } from "@/types/courses";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


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
      
        const detail: CourseDetail = {
          title: "PTE 50+ Intensive Course – 4 Weeks",
          slug: slug || "pte-50-plus-intensive-course-4-weeks",
          description:
            "Khóa học PTE 50+ chuyên sâu trong 4 tuần, tập trung Speaking, Writing và kỹ thuật làm bài thi thực chiến.",
          content: `
            <p>Khóa học PTE 50+ Intensive được thiết kế cho những bạn cần đạt mục tiêu PTE 50 trong thời gian ngắn.</p>
            <h2>1. Lộ trình học trong 4 tuần</h2>
            <ul>
              <li>Tuần 1: Nền tảng & phát âm, cấu trúc bài thi PTE</li>
              <li>Tuần 2: Speaking & Writing task quan trọng (RA, DI, RL, WE...)</li>
              <li>Tuần 3: Reading & Listening, kỹ thuật time management</li>
              <li>Tuần 4: Mock test, chữa bài chi tiết, fix lỗi cá nhân</li>
            </ul>
            <h2>2. Hình thức học</h2>
            <p>Học online qua Zoom, 2–3 buổi/tuần, kèm theo hệ thống bài tập & template trên nền tảng PTE iPASS.</p>
          `,
          image: "/images/courses/pte-50-intensive.jpg",
          category: { category_id: 2, name: "PTE Intensive", slug: "pte-intensive" },
          author: {
            user_id: 1,
            full_name: "Hanna",
          },
          level: "Intermediate – Target 50+",
          duration: "4 tuần",
          schedule: "Tối 2-4-6, 19:00–21:00 (GMT+7)",
          tuition: "9,900,000 VND",
          startDate: "2025-01-10T00:00:00Z",
          endDate: "2025-02-05T00:00:00Z",
          created_at: "2025-11-20T10:00:00Z",
          updated_at: "2025-11-22T12:30:00Z",
          tags: ["PTE", "PTE 50+", "Intensive", "Online Course"],
          isFeatured: true,
        };

        setData(detail);
        
        //   title: "PTE 50+ Intensive Course – 4 Weeks",
        //   slug: slug || "pte-50-plus-intensive-course-4-weeks",
        //   description:
        //     "Khóa học PTE 50+ chuyên sâu trong 4 tuần, tập trung Speaking, Writing và kỹ thuật làm bài thi thực chiến.",
        //   content: `
        //     <p>Khóa học PTE 50+ Intensive được thiết kế cho những bạn cần đạt mục tiêu PTE 50 trong thời gian ngắn.</p>
        //     <h2>1. Lộ trình học trong 4 tuần</h2>
        //     <ul>
        //       <li>Tuần 1: Nền tảng & phát âm, cấu trúc bài thi PTE</li>
        //       <li>Tuần 2: Speaking & Writing task quan trọng (RA, DI, RL, WE...)</li>
        //       <li>Tuần 3: Reading & Listening, kỹ thuật time management</li>
        //       <li>Tuần 4: Mock test, chữa bài chi tiết, fix lỗi cá nhân</li>
        //     </ul>
        //     <h2>2. Hình thức học</h2>
        //     <p>Học online qua Zoom, 2–3 buổi/tuần, kèm theo hệ thống bài tập & template trên nền tảng PTE iPASS.</p>
        //   `,
        //   image: "/images/courses/pte-50-intensive.jpg",
        //   category: { category_id: 2, name: "PTE Intensive", slug: "pte-intensive" },
        //   author: {
        //     user_id: 1,
        //     full_name: "Hanna",
        //   },
        //   level: "Intermediate – Target 50+",
        //   duration: "4 tuần",
        //   schedule: "Tối 2-4-6, 19:00–21:00 (GMT+7)",
        //   tuition: "9,900,000 VND",
        //   startDate: "2025-01-10T00:00:00Z",
        //   endDate: "2025-02-05T00:00:00Z",
        //   created_at: "2025-11-20T10:00:00Z",
        //   updated_at: "2025-11-22T12:30:00Z",
        //   tags: ["PTE", "PTE 50+", "Intensive", "Online Course"],
        //   isFeatured: true,
        // };
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
