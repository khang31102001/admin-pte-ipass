"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";

interface Option {
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

  const filtered =
    query === ""
      ? options
      : options.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          displayValue={(option: Option) => option?.label ?? ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />

        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </Combobox.Button>

        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
            {filtered.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary/10 text-primary" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>

                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
