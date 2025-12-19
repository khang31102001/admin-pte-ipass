
interface LoadingStateProps {
  title?: string;
  description?: string;
}

export default function LoadingState({
  title = "Đang tải dữ liệu…",
  description = "Vui lòng chờ trong giây lát",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-14 text-center">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#04016C]" />
      </div>

      <p className="mt-4 text-sm font-semibold text-[#04016C]">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>

      {/* subtle shimmer bar */}
      <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-1/3 animate-[loadingbar_1.2s_ease-in-out_infinite] rounded-full bg-[#F6E10E]" />
      </div>

      <style>{`
        @keyframes loadingbar {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </div>
  );
}
