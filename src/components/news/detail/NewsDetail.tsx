// src/components/news/NewsDetailPage.tsx
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";

interface NewsCategory {
  id: number | string;
  name: string;
  slug?: string;
}

interface NewsAuthor {
  name: string;
  avatarUrl?: string;
  position?: string;
}

export interface RelatedNewsItem {
  id: number | string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  publishedAt?: string;
  categoryName?: string;
}

export interface NewsDetailData {
  title: string;
  slug: string;
  description?: string;
  contentHtml: string;
  image?: string;
  category?: NewsCategory;
  author?: NewsAuthor;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  isFeatured?: boolean;
  readMinutes?: number; // optional: thời gian đọc ước tính
}

interface NewsDetailPageProps {
  data?: NewsDetailData;
  relatedNews?: RelatedNewsItem[];
}

const formatDate = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const NewsDetail: React.FC<NewsDetailPageProps> = ({ data, relatedNews }) => {
  const {
    title,
    description,
    contentHtml,
    image,
    category,
    author,
    publishedAt,
    updatedAt,
    tags = [],
    isFeatured,
    readMinutes,
  } = data;

  return (
    <>
      <PageMeta
        title={`Chi tiết tin tức: ${data.title} | Admin Dashboard`}
        description="Xem chi tiết thông tin, nội dung, của tin tức trong hệ thống quản lý."
      />
      <PageBreadcrumb pageTitle="Chi tiết tin tức" />

      <div className="min-h-screen bg-[#F5F6FA] text-[#1A1A1A]">
        {/* Top gradient strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#04016C] via-[#3E3AA7] to-[#F6E10E]" />

        <div className="max-w-5xl mx-auto px-4 pb-10 pt-6 md:pt-8 lg:pt-10">
          {/* Breadcrumb */}
          <nav className="mb-4 md:mb-6 text-xs md:text-sm text-gray-500 flex items-center gap-1 flex-wrap">
            <span className="hover:text-[#04016C] cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-[#04016C] cursor-pointer">News</span>
            {category && (
              <>
                <span>/</span>
                <span className="hover:text-[#04016C] cursor-pointer">
                  {category.name}
                </span>
              </>
            )}
          </nav>

          {/* Featured label / category */}
          <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
            {category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#04016C]/5 text-[#04016C] text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6E10E]" />
                {category.name}
              </span>
            )}

            {isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6E10E]/90 text-[#04016C] text-[11px] font-semibold uppercase tracking-[0.18em]">
                ★ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] leading-tight mb-3 md:mb-4">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mb-4 md:mb-5 leading-relaxed">
              {description}
            </p>
          )}

          {/* Meta row: author, date, read time */}
          <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8 text-xs md:text-sm text-gray-500">
            {author && (
              <div className="flex items-center gap-2">
                {author.avatarUrl ? (
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#3B3F4E] flex items-center justify-center text-[11px] font-semibold text-white">
                    {author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-medium text-[#111827]">
                    {author.name}
                  </div>
                  {author.position && (
                    <div className="text-[11px] text-gray-500">
                      {author.position}
                    </div>
                  )}
                </div>
              </div>
            )}

            {publishedAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>Published {formatDate(publishedAt)}</span>
              </>
            )}

            {readMinutes && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{readMinutes} min read</span>
              </>
            )}

            {updatedAt && updatedAt !== publishedAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>Updated {formatDate(updatedAt)}</span>
              </>
            )}
          </div>

          {/* Main card */}
          <div className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.09)] border border-[#E5E7EB] overflow-hidden">
            {/* Cover image */}
            {image && (
              <div className="relative h-52 md:h-72 lg:h-80 w-full overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {/* overlay gradient ở chân hình cho đẹp */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Content area */}
            <div className="px-5 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10">
              {/* Tags (top) */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F6E10E]/18 text-[11px] md:text-xs font-medium text-[#3B3F4E]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article content */}
              <div
                className="
                prose prose-sm md:prose-base lg:prose-lg
                max-w-none
                prose-headings:text-[#111827]
                prose-h1:text-2xl md:prose-h1:text-3xl lg:prose-h1:text-4xl
                prose-h2:text-xl md:prose-h2:text-2xl
                prose-a:text-[#1E1A9F] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#111827]
                prose-li:marker:text-[#04016C]
              "
                // ⚠️ Nhớ sanitize HTML khi dùng thực tế (DOMPurify...)
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Bottom tags again (optional) */}
              {tags.length > 0 && (
                <div className="mt-8 pt-5 border-t border-[#E5E7EB]">
                  <div className="text-xs font-semibold text-gray-500 mb-2">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#04016C]/5 text-[11px] md:text-xs font-medium text-[#04016C]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related news */}
          {relatedNews && relatedNews.length > 0 && (
            <section className="mt-8 md:mt-10 lg:mt-12">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h2 className="text-base md:text-lg font-semibold text-[#111827]">
                  Related News
                </h2>
                {/* Nếu bạn có router thì thay span = Link */}
                <span className="text-xs md:text-sm text-[#1E1A9F] hover:underline cursor-pointer">
                  View all news
                </span>
              </div>

              <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                {relatedNews.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                  >
                    {item.coverImageUrl && (
                      <div className="h-28 md:h-24 w-full overflow-hidden">
                        <img
                          src={item.coverImageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-3 md:p-4">
                      {item.categoryName && (
                        <div className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-1">
                          {item.categoryName}
                        </div>
                      )}
                      <h3 className="text-xs md:text-sm font-semibold text-[#111827] line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      {item.publishedAt && (
                        <div className="text-[11px] text-gray-500">
                          {formatDate(item.publishedAt)}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
