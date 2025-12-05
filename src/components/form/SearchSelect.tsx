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
  defaultValue?: Option | null;
}

export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  defaultValue,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.trim() === ""
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
    if (value) {
      setQuery(value.label);
    } else if (defaultValue) {
      setQuery(defaultValue.label);
    } else {
      setQuery("");
    }
  }, [value, defaultValue]);

  return (
    <div ref={wrapperRef} className="relative w-full mt-1 text-sm">
      {/* Input wrapper */}
      <div
        className="relative w-full"
        onClick={() => setOpen((prev) => !prev)}
      >
        <input
          className={`
            w-full rounded-lg border bg-white py-2.5 pl-3 pr-9
            text-sm leading-5
            border-gray-300
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition-colors duration-150
          `}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
        />

        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className={`
            absolute z-50 mt-1 max-h-64 w-full overflow-auto
            rounded-lg bg-white shadow-lg
            ring-1 ring-black/5
          `}
        >
          {filtered.length > 0 ? (
            <ul className="py-1">
              {filtered.map((option) => {
                const selected = value?.value === option.value;

                return (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      flex cursor-pointer items-center gap-2 px-3 py-2.5
                      text-sm
                      transition-colors duration-100
                      ${
                        selected
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-900 hover:bg-gray-100"
                      }
                    `}
                  >
                    {selected && (
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    )}
                    <span className="truncate">{option.label}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-3 py-2.5 text-sm text-gray-500">
              Không tìm thấy…
            </div>
          )}
        </div>
      )}
    </div>
  );
}
