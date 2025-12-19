
interface SectionLoadingProps {
  text?: string;
}

export default function SectionLoading({
  text = "Đang tải dữ liệu…",
}: SectionLoadingProps) {
  return (
    <div className="relative min-h-[180px] rounded-xl border border-gray-200 bg-white">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {/* spinner */}
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-gray-200 border-t-[#04016C]" />

        <p className="text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}

{/* <section className="mt-6">
  {isLoading ? (
    <SectionLoading text="Đang tải danh sách giáo viên…" />
  ) : (
    <TeacherTable data={teachers} />
  )}
</section> */}
