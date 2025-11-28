// EditNewsPage.tsx (chỉ phần thêm preview)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsForm, {
  CategoryOption,
  AuthorOption,
  NewsFormValues,
} from "@/components/news/NewsForm";
import NewsPreview from "@/components/news/detail/NewsPreview";

const mockCategories: CategoryOption[] = [
  { id: 1, name: "PTE Tips" },
  { id: 2, name: "PTE Exam News" },
];

const mockAuthors: AuthorOption[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Hanna" },
];

const EditNewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Partial<NewsFormValues>>();
  const [loading, setLoading] = useState(true);

  const [previewData, setPreviewData] = useState<NewsFormValues | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        // TODO: fetch API
        const data: Partial<NewsFormValues> = {
          title: "PTE Exam date updates 2025",
          slug: "pte-exam-date-updates-2025",
          description: "Latest PTE exam dates and booking tips.",
          content: "<p>Rich HTML content from backend...</p>",
          coverImageUrl: "/images/sample-cover.jpg",
          status: "published",
          startDate: "2025-11-01T09:00",
          metaTitle: "PTE Exam date updates 2025 | PTE iPASS",
          metaDescription: "SEO desc...",
          keywords: ["pte", "exam"],
          tags: ["exam", "update"],
          isFeatured: true,
          categoryId: 2,
          authorId: 2,
        };
        setInitialValues(data);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleUpdateNews = (values: NewsFormValues) => {
    console.log("Update news payload:", values);
    // TODO: API update
  };

  const handleCancel = () => {
    console.log("Cancel edit");
  };

  const handlePreview = (values: NewsFormValues) => {
    setPreviewData(values);
  };

  if (loading || !initialValues) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  // chọn tên category & author hiện tại để truyền cho preview
  // const currentCategory = mockCategories.find(
  //   (c) => c.id === initialValues.categoryId
  // );
  // const currentAuthor = mockAuthors.find(
  //   (a) => a.id === initialValues.authorId
  // );

  return (
    <>
      <NewsForm
        mode="update"
        initialValues={initialValues}
        categories={mockCategories}
        authors={mockAuthors}
        onSubmit={handleUpdateNews}
        onCancel={handleCancel}
        onPreview={handlePreview}
      />

      {/* Simple overlay modal cho preview */}
      {previewData && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
          <div className="relative z-50 w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-[90vh] overflow-y-auto">
              <NewsPreview
                values={previewData}
                categoryName={
                  mockCategories.find(
                    (c) => c.id.toString() === previewData.categoryId?.toString()
                  )?.name
                }
                authorName={
                  mockAuthors.find(
                    (a) => a.id.toString() === previewData.authorId?.toString()
                  )?.name
                }
                onClose={() => setPreviewData(null)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNewsPage;
