
import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option) => void;
  placeholder?: string;
}

export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered =
    query === ""
      ? options
      : options.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option);
    setQuery(option.label);
    setOpen(false);
  };

  useEffect(() => {
    // sync value -> input
    if (value) setQuery(value.label);
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative w-full mt-1">
      {/* Input */}
      <div
        className="relative w-full"
        onClick={() => setOpen((prev) => !prev)}
      >
        <input
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
        />

        <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
          {filtered.length > 0 ? (
            filtered.map((option) => {
              const selected = value?.value === option.value;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm
                    ${
                      selected
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-gray-100 text-gray-900"
                    }
                  `}
                >
                  {selected && <Check className="h-4 w-4 text-primary" />}
                  <span>{option.label}</span>
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              Không tìm thấy…
            </div>
          )}
        </div>
      )}
    </div>
  );
}
