import {
  NewsDetailData,
  RelatedNewsItem,
} from "@/components/news/detail/NewsDetail";
import NewsDetail from "@components/news/detail/NewsDetail";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newsService } from "@/services/news/newsService";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import ActionButtons from "@/components/common/ActionButtons";
import { ROUTES } from "@/config/routes";

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<NewsDetailData | null>(null);
  const [related, setRelated] = useState<RelatedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const detail = await newsService.getNewsDetail({ slug });
        const relatedList: RelatedNewsItem[] = [
          {
            id: 1,
            title: "How to reach PTE 65+ in 6 weeks – realistic roadmap",
            slug: "pte-65-in-6-weeks-roadmap",
            coverImageUrl: "/images/pte-related-1.jpg",
            publishedAt: "2025-11-10T09:00:00Z",
            categoryName: "PTE Tips",
          },
          {
            id: 2,
            title: "New speaking scoring changes – What students must know",
            slug: "pte-speaking-scoring-changes",
            coverImageUrl: "/images/pte-related-2.jpg",
            publishedAt: "2025-10-28T12:00:00Z",
            categoryName: "PTE Exam News",
          },
        ];

        setData(detail);
        setRelated(relatedList);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

    const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate(ROUTES.NEWS.LIST);
  };

  const handleEdit = () => {
    navigate(ROUTES.NEWS.UPDATE(slug));
  };


  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center text-sm text-gray-500">
        Loading article...
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`Chi tiết tin tức: ${data.title} | Admin Dashboard`}
        description="Xem chi tiết thông tin, nội dung, của tin tức trong hệ thống quản lý."
      />
      <PageBreadcrumb pageTitle="Chi tiết tin tức" />
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
            <NewsDetail data={data} relatedNews={related} />
        </ComponentCard>
    
    </>
  );
};

export default NewsDetailPage;
