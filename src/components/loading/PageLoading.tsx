
interface PageLoadingProps {
  title?: string;
  description?: string;
}

export default function PageLoading({
  title = "Đang tải trang",
  description = "Vui lòng chờ trong giây lát…",
}: PageLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#04016C]" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[#04016C]">{title}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        {/* subtle progress */}
        <div className="mt-2 h-1 w-48 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-1/3 animate-[loadingbar_1.4s_ease-in-out_infinite] rounded-full bg-[#F6E10E]" />
        </div>

        <style>{`
          @keyframes loadingbar {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(320%); }
          }
        `}</style>
      </div>
    </div>
  );
}

// 👉 Cách dùng cho toàn trang
// if (isLoadingPage) {
//   return <PageLoading title="Đang tải giáo viên" />;
// }
