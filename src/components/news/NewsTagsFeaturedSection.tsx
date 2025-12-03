// NewsTagsFeaturedSection.tsx
import React, { KeyboardEvent } from "react";
import Switch from "../form/switch/Switch";
import { News } from "@/types/news";

interface NewsTagsFeaturedSectionProps {
  tags: string[];
  isFeatured: boolean;
  onAddTag: (e: KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
  onChangeNewsData: (update: Partial<News>) => void;
}

export const NewsTagsFeaturedSection: React.FC<NewsTagsFeaturedSectionProps> = ({
  tags,
  isFeatured,
  onAddTag,
  onRemoveTag,
  onChangeNewsData,
}) => {
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
      <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
        Tags & Featured
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1.5">Tags</label>
          <input
            type="text"
            onKeyDown={onAddTag}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="Press Enter to add tag"
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F6E10E]/20 text-[#3B3F4E] text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => onRemoveTag(tag)}
                    className="text-[10px] hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F0F1F4] mt-3">
          <div>
            <p className="text-xs font-medium">Featured</p>
            <p className="text-[11px] text-gray-500">
              Display this news in featured section.
            </p>
          </div>
           <Switch
              label="Nổi bật"
              defaultChecked={isFeatured}
              onChange={(checked) => onChangeNewsData({ isFeatured: checked })}
            />
        </div>
      </div>
    </section>
  );
};
