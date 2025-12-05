// NewsSeoMetaSection.tsx
import { News } from "@/types/news";
import React, { KeyboardEvent } from "react";
import Switch from "../form/switch/Switch";

interface NewsSeoMetaSectionProps {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonical?: string | null;
  noindex?: boolean; 
  onChangeNewsData: (
    update: Partial<News>
  ) => void;
  onAddKeyword: (e: KeyboardEvent<HTMLInputElement>) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export const NewsSeoMetaSection: React.FC<NewsSeoMetaSectionProps> = ({
  noindex = false,
  metaTitle,
  metaDescription,
  keywords,
  onChangeNewsData,
  onAddKeyword,
  onRemoveKeyword,
}) => {
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
      <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
        SEO Meta
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1.5">
            Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={metaTitle}
            onChange={(e)=> onChangeNewsData({metaTitle: e.target.value})}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="SEO meta title"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={metaDescription}
            onChange={(e)=> onChangeNewsData({metaDescription: e.target.value })}
            rows={3}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent resize-none"
            placeholder="SEO meta description"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">
            Keywords
          </label>
          <input
            type="text"
            onKeyDown={onAddKeyword}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="Press Enter to add keyword"
          />
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {keywords.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#04016C]/5 text-[#04016C] text-xs"
                >
                  {k}
                  <button
                    type="button"
                    onClick={() => onRemoveKeyword(k)}
                    className="text-[10px] hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <Switch
              label="Allow indexing"
              defaultChecked={!noindex}
              onChange={(val) => 
                onChangeNewsData({ noindex: !val })
              }
              color="blue"
            />
            <p className="mt-2 text-sm text-gray-500">
              Nếu tắt, bài viết sẽ không được index bởi Google.
            </p>
        </div>
      </div>
    </section>
  );
};
