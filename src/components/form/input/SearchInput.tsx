
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {

  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  debounceDelay?: number;
  className?: string;
  inputClassName?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  defaultValue = "",
  placeholder = "Tìm kiếm...",
  onChange,
  onDebouncedChange,
  debounceDelay = 400,
  className = "",
  inputClassName = "",
}) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? defaultValue);

  // Nếu component được dùng controlled (value từ props), sync lại khi value thay đổi
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Debounce logic
  useEffect(() => {
    if (!onDebouncedChange) return;

    const handler = setTimeout(() => {
      onDebouncedChange(internalValue.trim());
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [internalValue, debounceDelay, onDebouncedChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("relative w-full max-w-xs", className)}>
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60",
          "dark:bg-slate-900 dark:border-gray-700 dark:text-white",
          inputClassName
        )}
      />
      {/* Nếu bạn dùng icon search thì thêm vào đây */}
      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchInput;
