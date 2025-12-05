export const ImagePreview: React.FC<{ src?: string | null }> = ({ src }) => {
  if (!src) {
    return (
      <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-gray-50 text-xs text-gray-400">
        Image preview will appear here
      </div>
    );
  }

  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
      <img
        src={src}
        alt="About preview"
        className="max-h-40 w-full object-cover rounded-md"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/400x200?text=PTE+iPASS";
        }}
      />
    </div>
  );
};