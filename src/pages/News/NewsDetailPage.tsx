// src/pages/news/NewsDetailRoute.tsx
import { NewsDetailData, RelatedNewsItem } from "@/components/news/detail/NewsDetail";
import NewsDetail from "@components/news/detail/NewsDetail"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<NewsDetailData | null>(null);
  const [related, setRelated] = useState<RelatedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // TODO: Call API thực tế
        // const res = await api.get(`/news/${slug}`);
        // setData(res.data);

        // MOCK DEMO
        const detail: NewsDetailData = {
          title: "PTE Exam date updates 2025 – What you need to know",
          slug: slug || "pte-exam-date-updates-2025",
          description:
            "Stay updated with the latest PTE exam dates, booking strategy and preparation tips for 2025.",
          contentHtml: `
            <p>PTE exam dates in 2025 are more flexible than ever, but you still need a clear strategy.</p>
            <h2>1. Booking early is still key</h2>
            <p>Booking 4–6 weeks in advance gives you more options for time and test centre.</p>
            <ul>
              <li>Watch peak seasons: Jan–Mar and Jul–Sep</li>
              <li>Keep a backup date in mind</li>
              <li>Align booking with your visa or study deadlines</li>
            </ul>
            <h2>2. New changes for repeat test takers</h2>
            <p>Some centres offer special slots for repeat test takers – check availability early.</p>
          `,
          coverImageUrl: "/images/pte-news-demo.jpg",
          category: { id: 2, name: "PTE Exam News", slug: "pte-exam-news" },
          author: {
            name: "Hanna",
            position: "PTE Academic Coach & Founder of PTE iPASS",
          },
          publishedAt: "2025-11-20T10:00:00Z",
          updatedAt: "2025-11-22T12:30:00Z",
          tags: ["PTE", "Exam Date", "Booking", "2025"],
          isFeatured: true,
          readMinutes: 6,
        };

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
