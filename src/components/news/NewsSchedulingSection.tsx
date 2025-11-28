// NewsSchedulingSection.tsx
import React, { ChangeEvent } from "react";

interface NewsSchedulingSectionProps {
  status: string;
  startDate?: string;
  endDate?: string;
  onFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >
  ) => void;
}

export const NewsSchedulingSection: React.FC<NewsSchedulingSectionProps> = ({
  status,
  startDate,
  endDate,
  onFieldChange,
}) => {
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
      <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
        Content Scheduling
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1.5">Status</label>
          <select
            name="status"
            value={status}
            onChange={onFieldChange}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Start Date
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={startDate || ""}
            onChange={onFieldChange}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={endDate || ""}
            onChange={onFieldChange}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
          />
        </div>
      </div>
    </section>
  );
};
