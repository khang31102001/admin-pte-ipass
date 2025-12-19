type SkeletonVariant = "table" | "cards";

interface ListSkeletonProps {
  rows?: number;
  variant?: SkeletonVariant;
}

export default function ListSkeleton({
  rows = 8,
  variant = "table",
}: ListSkeletonProps) {
  const items = Array.from({ length: rows });

  if (variant === "cards") {
    return (
      <div className="space-y-3">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
              </div>
              <div className="h-8 w-20 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // table-like skeleton
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* header */}
      <div className="animate-pulse border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="h-4 w-1/4 rounded bg-gray-200" />
      </div>

      {/* rows */}
      <div className="divide-y divide-gray-100">
        {items.map((_, idx) => (
          <div key={idx} className="animate-pulse px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-3 w-1/6 rounded bg-gray-200" />
              <div className="h-3 w-2/5 rounded bg-gray-200" />
              <div className="ml-auto h-3 w-1/5 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//   if (isLoading) {
//     return <ListSkeleton rows={10} variant="table" />; // ✅ best practice
//     // return <LoadingState />; // option nhẹ
//   }
