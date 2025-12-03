// src/pages/news/NewsDetailRoute.tsx
import {
  NewsDetailData,
  RelatedNewsItem,
} from "@/components/news/detail/NewsDetail";
import NewsDetail from "@components/news/detail/NewsDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsService } from "@/services/news/newsService";

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<NewsDetailData | null>(null);
  const [related, setRelated] = useState<RelatedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center text-sm text-gray-500">
        Loading article...
      </div>
    );
  }

  return <NewsDetail data={data} relatedNews={related} />;
};

export default NewsDetailPage;
