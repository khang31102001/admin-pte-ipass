
import { News, NewsStatus } from "@/types/news";
import { formatDateByInputType } from "@/utils/dateFormat";

import React from "react";

interface NewsSchedulingSectionProps {
  status: NewsStatus;
  startDate?: string;
  endDate?: string;
  onChangeNewsData: (
    update: Partial<News>
  ) => void;
}

export const NewsSchedulingSection: React.FC<NewsSchedulingSectionProps> = ({
  status,
  startDate,
  endDate,
  onChangeNewsData,
}) => {


  const STATUS_OPTIONS = [
    { value: NewsStatus.DRAFT, label: "Bản nháp" },
    { value: NewsStatus.PUBLISHED, label: "Đã xuất bản" },
    { value: NewsStatus.SCHEDULED, label: "Hẹn lịch đăng" },
  ] as const;

  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 sm:p-5 lg:p-6 bg-white">
      <h2 className="text-base sm:text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
        Cài đặt hiển thị nội dung
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1.5 min-h-10 line-clamp-2">Trạng thái</label>
          <select
            name="status"
            value={status}
            onChange={(e) => onChangeNewsData({ status: e.target.value as NewsStatus })}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7]"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1.5 min-h-10 line-clamp-2">
            Ngày bắt đầu hiển thị
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={ formatDateByInputType(startDate, "datetime-local") || ""}
            onChange={(e) => onChangeNewsData({ startDate: e.target.value })}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7]"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1.5 min-h-10">
            Ngày kết thúc hiển thị
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={formatDateByInputType(endDate, "datetime-local") || ""}
            onChange={(e) => onChangeNewsData({ endDate: e.target.value })}
            className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7]"
          />
        </div>
      </div>
    </section>
  );
};
