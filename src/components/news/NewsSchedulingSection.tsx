// NewsSchedulingSection.tsx
import { News } from "@/types/news";
import React from "react";

interface NewsSchedulingSectionProps {
  status: string;
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
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
  <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
    Cài đặt hiển thị nội dung
  </h2>

  <div className="grid gap-4 md:grid-cols-3">
    {/* Status */}
    <div className="md:col-span-1">
      <label className="block text-sm font-medium mb-1.5">Trạng thái</label>
      <select
        name="status"
        value={status}
        onChange={(e)=>onChangeNewsData({status: e.target.value})}
        className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
      >
        <option value="draft">Bản nháp</option>
        <option value="published">Đã xuất bản</option>
        <option value="scheduled">Hẹn lịch đăng</option>
      </select>
    </div>

    {/* Start Date */}
    <div>
      <label className="block text-sm font-medium mb-1.5">
        Ngày bắt đầu hiển thị
      </label>
      <input
        type="datetime-local"
        name="startDate"
        value={startDate || ""}
        onChange={(e)=> onChangeNewsData({startDate: e.target.value})}
        className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
      />
    </div>

    {/* End Date */}
    <div>
      <label className="block text-sm font-medium mb-1.5">
        Ngày kết thúc hiển thị
      </label>
      <input
        type="datetime-local"
        name="endDate"
        value={endDate || ""}
        onChange={(e)=> onChangeNewsData({endDate: e.target.value})}
        className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
      />
    </div>
  </div>
</section>

  );
};
