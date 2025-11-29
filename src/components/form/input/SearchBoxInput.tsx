import { useState } from "react";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { SearchResult, useSearchDetector } from "@/hooks/useSearchDetector";


interface SearchBoxProps {
  onSearch: (result: SearchResult) => void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function SearchBoxInput({
  onSearch,
  placeholder = "Nhập mã / tên / slug khóa học...",
  buttonText = "Tải dữ liệu",
  className = "",
}: SearchBoxProps) {
  const [searchValue, setSearchValue] = useState("");
  const { detectType } = useSearchDetector();

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    const result = detectType(searchValue);
    onSearch(result);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button size="sm" variant="primary" onClick={handleSearch}>
        {buttonText}
      </Button>
    </div>
  );
}
