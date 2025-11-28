// NewsCategorySection.tsx
import React, { ChangeEvent } from "react";

interface CategoryOption {
  id: number | string;
  name: string;
}

interface NewsCategorySectionProps {
  categories: CategoryOption[];
  categoryId?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const NewsCategorySection: React.FC<NewsCategorySectionProps> = ({
  categories,
  categoryId,
  onChange,
}) => {
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
      <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
        Category
      </h3>
      <div>
        <label className="block text-xs font-medium mb-1.5">
          Select category
        </label>
        <select
          name="categoryId"
          value={categoryId?.toString() || ""}
          onChange={onChange}
          className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
        >
          <option value="">-- Select category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
