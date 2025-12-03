// CreateNewsPage.tsx
import React from "react";
import NewsForm, {
  CategoryOption,
  AuthorOption,
  NewsFormValues,
} from "@/components/news/NewsForm"; // chỉnh lại path theo project của bạn

// Dummy data – sau này bạn fetch từ API
const mockCategories: CategoryOption[] = [
  { id: 1, name: "PTE Tips" },
  { id: 2, name: "PTE Exam News" },
  { id: 3, name: "Study & Migration" },
];

const mockAuthors: AuthorOption[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Hanna" },
];

const CreateNewsPage: React.FC = () => {
  const handleCreateNews = (values: NewsFormValues) => {
    console.log("Create news payload:", values);

    // TODO: call API create
    // const formData = new FormData();
    // Object.entries(values).forEach(([key, val]) => {
    //   if (key === "coverImageFile" && val instanceof File) {
    //     formData.append("cover", val);
    //   } else if (Array.isArray(val)) {
    //     formData.append(key, JSON.stringify(val));
    //   } else if (val !== undefined && val !== null) {
    //     formData.append(key, String(val));
    //   }
    // });
    // await api.post("/news", formData);
  };

  const handleCancel = () => {
    // Có thể navigate về //news
    console.log("Cancel create news");
  };

  return (
    <NewsForm
      mode="create"
      categories={mockCategories}
      authors={mockAuthors}
      onSubmit={handleCreateNews}
      onCancel={handleCancel}
    />
  );
};

export default CreateNewsPage;
