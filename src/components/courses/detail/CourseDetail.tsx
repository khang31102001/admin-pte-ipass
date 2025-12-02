
import { formatDate } from "@/lib/helper";
import { CourseDetail } from "@/types/courses";


interface CourseDetailPageProps {
  data?: CourseDetail;
}

const DetailCourse = ({ data }: CourseDetailPageProps) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-4 pb-10 pt-6 md:pt-8 lg:pt-10">
        {/* Featured label / category */}
        <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
          {data.category && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#04016C]/5 text-[#04016C] text-[11px] font-semibold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6E10E]" />
              {data.category.name}
            </span>
          )}

          {data.isFeatured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6E10E]/90 text-[#04016C] text-[11px] font-semibold uppercase tracking-[0.18em]">
              ★ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] leading-tight mb-3 md:mb-4">
          {data.title}
        </h1>

        {/* Description */}
        {data.description && (
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mb-4 md:mb-5 leading-relaxed">
            {data.description}
          </p>
        )}

        {/* Meta row: author, date */}
        <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8 text-xs md:text-sm text-gray-500">
          {data.author && (
            <div className="flex items-center gap-2">
              {data.author.avatar ? (
                <img
                  src={data.author.avatar}
                  alt={data.author.full_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#3B3F4E] flex items-center justify-center text-[11px] font-semibold text-white">
                  {data.author.full_name.charAt(0)}
                </div>
              )}
            </div>
          )}

          {data.created_at && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>Published {formatDate(data.created_at)}</span>
            </>
          )}

          {data.updated_at && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>Updated {formatDate(data.updated_at)}</span>
            </>
          )}
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.09)] border border-[#E5E7EB] overflow-hidden">
          {/* Cover image */}
          {data.image && (
            <div className="relative h-52 md:h-72 lg:h-80 w-full overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              {/* overlay gradient ở chân hình cho đẹp */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Content area */}
          <div className="px-5 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10">
            {/* 🆕 Course quick info (Level, Duration, Schedule, Tuition) */}
            {(data.level || data.duration || data.schedule || data.tuition) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 md:mb-7">
                {data.level && (
                  <div className="flex items-start gap-2 p-3 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#04016C]" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Level
                      </div>
                      <div className="text-sm font-medium text-[#111827]">
                        {data.level}
                      </div>
                    </div>
                  </div>
                )}

                {data.duration && (
                  <div className="flex items-start gap-2 p-3 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#04016C]" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Thời lượng
                      </div>
                      <div className="text-sm font-medium text-[#111827]">
                        {data.duration}
                      </div>
                    </div>
                  </div>
                )}

                {data.schedule && (
                  <div className="flex items-start gap-2 p-3 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#04016C]" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Lịch học
                      </div>
                      <div className="text-sm font-medium text-[#111827]">
                        {data.schedule}
                      </div>
                    </div>
                  </div>
                )}

                {data.tuition && (
                  <div className="flex items-start gap-2 p-3 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#04016C]" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Học phí
                      </div>
                      <div className="text-sm font-semibold text-[#111827]">
                        {data.tuition}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags (top) */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                {data.tags.map((tag) => (
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
              dangerouslySetInnerHTML={{ __html: data.content }}
            />

            {/* Bottom tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="mt-8 pt-5 border-t border-[#E5E7EB]">
                <div className="text-xs font-semibold text-gray-500 mb-2">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
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
      </div>
    </div>
  );
};

export default DetailCourse;

