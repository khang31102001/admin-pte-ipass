// NewsAuthorSection.tsx
import React, { ChangeEvent } from "react";

interface AuthorOption {
  id: number | string;
  name: string;
  avatarUrl?: string;
}

interface NewsAuthorSectionProps {
  authors: AuthorOption[];
  author?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const NewsAuthorSection: React.FC<NewsAuthorSectionProps> = ({
  authors,
  author,
  onChange,
}) => {
  const currentAuthor = author
    ? authors.find((a) => a.id.toString() === author.toString())
    : undefined;

  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
      <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
        Author
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1.5">Author</label>
          <select
            name="author"
            value={author?.toString() || ""}
            onChange={onChange}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
          >
            <option value="">-- Select author --</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {currentAuthor && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B3F4E] flex items-center justify-center text-xs font-semibold text-white">
              {currentAuthor.name[0]}
            </div>
            <div className="text-xs text-gray-500">
              Avatar preview (read-only). Có thể nâng cấp cho phép override sau.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
